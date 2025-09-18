import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { pushNotification } from './notify';

export async function checkAndAwardBadges(env: Env, user_id: string) {
  if (!user_id || user_id === 'anon') return;
  
  // Get all badges and check criteria
  const badges = await env.DB.prepare('SELECT * FROM badges').all();
  
  for (const badge of badges.results as any[]) {
    // Check if user already has this badge
    const existing = await env.DB.prepare('SELECT 1 FROM user_badges WHERE user_id=? AND badge_id=?')
      .bind(user_id, badge.id).first();
    if (existing) continue;
    
    const criteria = JSON.parse(badge.criteria_json);
    let shouldAward = false;
    
    switch (criteria.type) {
      case 'votes_received': {
        const result = await env.DB.prepare(`
          SELECT COUNT(*) as count FROM votes v 
          JOIN terms t ON t.id = v.term_id 
          WHERE t.author_id = ?
        `).bind(user_id).first<{count: number}>();
        shouldAward = (result?.count || 0) >= criteria.threshold;
        break;
      }
      case 'deans_list': {
        const oneWeekAgo = Date.now() - 7*24*60*60*1000;
        const result = await env.DB.prepare(`
          SELECT COUNT(*) as count FROM terms t
          JOIN votes v ON v.term_id = t.id AND v.created_at >= ?
          WHERE t.author_id = ?
          GROUP BY t.id
          HAVING SUM(CASE WHEN v.reaction IN ('cringe', 'heard1000x') THEN 1 ELSE 0 END) > 0
        `).bind(oneWeekAgo, user_id).first<{count: number}>();
        shouldAward = (result?.count || 0) >= criteria.count;
        break;
      }
      case 'followers': {
        const result = await env.DB.prepare('SELECT COUNT(*) as count FROM follows WHERE followee_id=?')
          .bind(user_id).first<{count: number}>();
        shouldAward = (result?.count || 0) >= criteria.threshold;
        break;
      }
      case 'wall_uploads': {
        const result = await env.DB.prepare('SELECT COUNT(*) as count FROM wall_items WHERE submitter_id=?')
          .bind(user_id).first<{count: number}>();
        shouldAward = (result?.count || 0) >= criteria.threshold;
        break;
      }
    }
    
    if (shouldAward) {
      // Award the badge
      await env.DB.prepare('INSERT INTO user_badges (user_id, badge_id, awarded_at) VALUES (?,?,?)')
        .bind(user_id, badge.id, Date.now()).run();
      
      // Notify the user
      await pushNotification(env, user_id, 'badge_awarded', { 
        badge_id: badge.id, 
        badge_name: badge.name,
        badge_icon: badge.icon 
      });
    }
  }
}

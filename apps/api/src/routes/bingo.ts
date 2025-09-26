import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';

const bingo = new Hono<{ Bindings: Env }>();

bingo.get('/generate', async (c) => {
  try {
    // Get random single-word terms for bingo board (8 characters or less)
    const { results } = await c.env.DB.prepare(`
      SELECT title, slug FROM terms_v2 
      WHERE status = 'published' 
      AND title NOT LIKE '% %'
      AND title NOT LIKE '%-%'
      AND LENGTH(title) <= 8
      ORDER BY RANDOM() 
      LIMIT 24
    `).all();
    
    const terms = results as any[];
    if (terms.length < 24) return c.text('Not enough terms for bingo', 400);
    
    // Create 5x5 board with FREE space in center
    const board = [];
    for (let i = 0; i < 25; i++) {
      if (i === 12) { // Center space
        board.push({ title: 'FREE', slug: 'free', isFree: true });
      } else {
        const termIndex = i > 12 ? i - 1 : i;
        board.push({ ...terms[termIndex], isFree: false });
      }
    }
    
    const boardId = nanoid(8);
    
    // Store board in KV for sharing (if CACHE is available)
    if (c.env.CACHE) {
      await c.env.CACHE.put(`bingo:${boardId}`, JSON.stringify(board), { expirationTtl: 7 * 24 * 60 * 60 });
    }
    
    return c.json({ boardId, board });
  } catch (error) {
    console.error('Bingo generation error:', error);
    return c.text('Failed to generate bingo board', 500);
  }
});

bingo.get('/:boardId', async (c) => {
  const { boardId } = c.req.param();
  const boardData = await c.env.CACHE.get(`bingo:${boardId}`);
  
  if (!boardData) return c.text('Board not found', 404);
  
  const board = JSON.parse(boardData);
  return c.json({ boardId, board });
});

export default bingo;

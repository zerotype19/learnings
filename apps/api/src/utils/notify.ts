import { nanoid } from 'nanoid';
import type { Env } from '../index';

export async function pushNotification(env: Env, user_id: string, type: string, payload: Record<string, any>) {
  await env.DB.prepare(
    'INSERT INTO notifications (id, user_id, type, payload_json, created_at) VALUES (?,?,?,?,?)'
  ).bind(nanoid(), user_id, type, JSON.stringify(payload), Date.now()).run();
}

import { nanoid } from 'nanoid';
export async function pushNotification(env, user_id, type, payload) {
    await env.DB.prepare('INSERT INTO notifications (id, user_id, type, payload_json, created_at) VALUES (?,?,?,?,?)').bind(nanoid(), user_id, type, JSON.stringify(payload), Date.now()).run();
}

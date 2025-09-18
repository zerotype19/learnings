import { Hono } from 'hono';
import { nanoid } from 'nanoid';

const social = new Hono();

social.post('/share/:type/:id', async (c) => {
  const { type, id } = c.req.param();
  const code = nanoid(7);
  const target = `/${type}/${id}`;
  await c.env.DB.prepare(`INSERT INTO shortlinks (code, target, created_at) VALUES (?, ?, ?)`)
    .bind(code, target, Date.now())
    .run();
  return c.json({ short: `/l/${code}` });
});

export default social;

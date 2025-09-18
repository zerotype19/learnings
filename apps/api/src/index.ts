import { Hono } from 'hono';
import { cors } from 'hono/cors';
import terms from './routes/terms';
import social from './routes/social';
import ai from './routes/ai';
import og from './routes/og';
import wall from './routes/wall';

export type Env = {
  DB: D1Database;
  R2: R2Bucket;
  CACHE: KVNamespace;
  JOBS: Queue;
  AI: any;  // Workers AI binding
  CORS_ORIGIN: string;
};

const app = new Hono<{ Bindings: Env }>();
app.use('*', cors({ origin: '*' }));

app.get('/v1/health', (c) => c.json({ ok: true }));
app.route('/v1/terms', terms);
app.route('/v1', social);
app.route('/v1/ai', ai);
app.route('/v1/og', og);
app.route('/v1/wall', wall);

export default app;

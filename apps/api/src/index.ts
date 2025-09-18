import { Hono } from 'hono';
import { cors } from 'hono/cors';
import terms from './routes/terms';
import social from './routes/social';
import ai from './routes/ai';

export type Env = {
  DB: D1Database;
  R2: R2Bucket;
  CACHE: KVNamespace;
  JOBS: Queue;
  VEC: any; // vectorize binding type when available
  AI: any;  // Workers AI binding
  CORS_ORIGIN: string;
};

const app = new Hono<{ Bindings: Env }>();
app.use('*', cors({ origin: '*' }));

app.get('/v1/health', (c) => c.json({ ok: true }));
app.route('/v1/terms', terms);
app.route('/v1', social);
app.route('/v1/ai', ai);

export default app;

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import terms from './routes/terms';
import social from './routes/social';
import ai from './routes/ai';
import og from './routes/og';
import wall from './routes/wall';
import embeds from './routes/embeds';
import profile from './routes/profile';
import referrals from './routes/referrals';
import challenges from './routes/challenges';
import notifications from './routes/notifications';

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
app.route('/v1/profile', profile);
app.route('/v1/challenges', challenges);
app.route('/v1/notifications', notifications);
app.route('/r', referrals);
app.route('/', embeds); // exposes /v1/embed/* and /oembed

export default app;

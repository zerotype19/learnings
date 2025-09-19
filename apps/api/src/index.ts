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
import suggest from './routes/suggest';
import auth from './routes/auth';
import bingo from './routes/bingo';
import admin from './routes/admin';
import termsV2 from './routes/terms-v2';
import search from './routes/search';
import adminV2 from './routes/admin-v2';
import wallV2 from './routes/wall-v2';
import generators from './routes/generators';
import homeFeed from './routes/home-feed';

export type Env = {
  DB: D1Database;
  R2: R2Bucket;
  CACHE: KVNamespace;
  JOBS: Queue;
  AI: any;  // Workers AI binding
  CORS_ORIGIN: string;
  JWT_SECRET: string;
  LINKEDIN_CLIENT_ID?: string;
  LINKEDIN_CLIENT_SECRET?: string;
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: (origin) => {
    if (!origin) return true; // Allow requests without origin (Postman, curl, etc.)
    // Allow current domains and future production domains
    const allowedOrigins = [
      'https://learnings.org',
      'https://www.learnings.org', 
      'https://learnings-b6y.pages.dev', // Current Pages domain
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    return allowedOrigins.includes(origin) ? origin : '';
  },
  allowMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Fingerprint'],
  credentials: true, // allow cookies
  maxAge: 86400
}));

app.get('/v1/health', (c) => c.json({ ok: true }));
app.route('/v1/terms', terms);
app.route('/v1', social);
app.route('/v1/ai', ai);
app.route('/v1/og', og);
app.route('/v1/wall', wall);
app.route('/v1/profile', profile);
app.route('/v1/challenges', challenges);
app.route('/v1/notifications', notifications);
app.route('/v1/suggest', suggest);
app.route('/v1/auth', auth);
app.route('/v1/bingo', bingo);
app.route('/v1/admin', admin);
app.route('/auth', auth);
app.route('/r', referrals);
app.route('/', embeds); // exposes /v1/embed/* and /oembed

// New v2 API routes
app.route('/api/terms', termsV2);
app.route('/api/wall', wallV2);
app.route('/api/search', search);
app.route('/api/admin', adminV2);
app.route('/api/generators', generators);
app.route('/api/generate', generators);
app.route('/api/home-feed', homeFeed);

// Mount voting endpoint at top level
app.route('/api', wallV2); // This will expose /api/vote

export default {
  fetch: app.fetch,
  queue: async (batch: MessageBatch<any>, env: Env) => {
    for (const msg of batch.messages) {
      if (msg.body?.type === 'moderate_wall') {
        const { id, key } = msg.body;
        await (await import('./workers/moderate')).moderateWall(env, id, key);
      }
    }
  },
  scheduled: async (event: ScheduledEvent, env: Env) => {
    // Weekly digest on Mondays
    if (event.cron === "0 9 * * 1") {
      await (await import('./workers/digest')).sendWeeklyDigest(env);
    }
  }
} as ExportedHandler<Env>;

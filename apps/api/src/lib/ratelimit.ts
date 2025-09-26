interface RateLimitConfig {
  kv: KVNamespace;
  dailyLimit: number;
  burstLimit: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export class RateLimiter {
  private kv: KVNamespace;
  private dailyLimit: number;
  private burstLimit: number;
  private windowMs: number;

  constructor(config: RateLimitConfig) {
    this.kv = config.kv;
    this.dailyLimit = config.dailyLimit;
    this.burstLimit = config.burstLimit;
    this.windowMs = config.windowMs;
  }

  async checkLimit(identifier: string, isAuthenticated: boolean = false): Promise<RateLimitResult> {
    const now = new Date();
    const today = now.toISOString().split('T')[0].replace(/-/g, '');
    const minute = now.toISOString().slice(0, 16).replace(/[-:]/g, '');
    
    // Adjust limits based on authentication
    const dailyLimit = isAuthenticated ? 150 : 100;
    const burstLimit = isAuthenticated ? 10 : 8;

    const dailyKey = `bw::${identifier}::${today}`;
    const burstKey = `bw::${identifier}::minute::${minute}`;

    try {
      // Check daily limit
      const dailyCount = await this.kv.get(dailyKey);
      const dailyUsage = dailyCount ? parseInt(dailyCount) : 0;

      if (dailyUsage >= dailyLimit) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        return {
          allowed: false,
          remaining: 0,
          resetTime: tomorrow.getTime()
        };
      }

      // Check burst limit
      const burstCount = await this.kv.get(burstKey);
      const burstUsage = burstCount ? parseInt(burstCount) : 0;

      if (burstUsage >= burstLimit) {
        const nextMinute = new Date(now);
        nextMinute.setMinutes(nextMinute.getMinutes() + 1);
        nextMinute.setSeconds(0, 0);
        
        return {
          allowed: false,
          remaining: dailyLimit - dailyUsage,
          resetTime: nextMinute.getTime()
        };
      }

      // Increment counters
      await Promise.all([
        this.kv.put(dailyKey, (dailyUsage + 1).toString(), {
          expirationTtl: 86400 // 24 hours
        }),
        this.kv.put(burstKey, (burstUsage + 1).toString(), {
          expirationTtl: 60 // 1 minute
        })
      ]);

      return {
        allowed: true,
        remaining: dailyLimit - dailyUsage - 1,
        resetTime: now.getTime() + 86400000 // 24 hours from now
      };

    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Fail open - allow the request if rate limiting fails
      return {
        allowed: true,
        remaining: dailyLimit,
        resetTime: now.getTime() + 86400000
      };
    }
  }
}

export function createRateLimiter(kv: KVNamespace, isAuthenticated: boolean = false): RateLimiter {
  return new RateLimiter({
    kv,
    dailyLimit: isAuthenticated ? 150 : 100,
    burstLimit: isAuthenticated ? 10 : 8,
    windowMs: 60000 // 1 minute
  });
}

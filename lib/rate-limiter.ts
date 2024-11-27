interface RateLimitEntry {
  count: number;
  timestamp: number;
}

interface CacheEntry {
  data: any;
  timestamp: number;
}

class RateLimiter {
  private static instance: RateLimiter;
  private requests: Map<string, RateLimitEntry> = new Map();
  private cache: Map<string, CacheEntry> = new Map();
  private readonly WINDOW_MS = 60000;
  private readonly MAX_REQUESTS = 30;
  private readonly CACHE_TTL = 300000;

  private constructor() {}

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  public checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(ip);

    if (!entry) {
      this.requests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (now - entry.timestamp > this.WINDOW_MS) {
      this.requests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (entry.count >= this.MAX_REQUESTS) {
      return false;
    }

    entry.count++;
    return true;
  }

  public getCached(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  public clearOldEntries(): void {
    const now = Date.now();

    for (const [key, entry] of this.requests.entries()) {
      if (now - entry.timestamp > this.WINDOW_MS) {
        this.requests.delete(key);
      }
    }

    // Clear old cache entries
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }
}

export const rateLimiter = RateLimiter.getInstance();

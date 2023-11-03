import { Store, SessionData } from "hono-sessions";

interface RedisStoreOptions {
  client: any;
  prefix?: string;
  ttl?: number;
}

export class BunRedisStore implements Store {
  prefix: string;
  ttl: number;
  RedisClient: any;

  constructor(options: RedisStoreOptions) {
    this.prefix = options.prefix == null ? "session:" : options.prefix;
    this.ttl = options.ttl || 86400;
    this.RedisClient = options.client;
  }

  async getSessionById(
    sessionId: string
  ): Promise<SessionData | null | undefined> {
    const key = (this.prefix + sessionId).toString();
    const result = await this.RedisClient.get(key);
    if (result) {
      return JSON.parse(result);
    } else {
        return null;
    }
}

async createSession(
    sessionId: string,
    initialData: SessionData
    ): Promise<void> {
        const key = (this.prefix + sessionId).toString();
        const ttl = this.ttl;
        await this.RedisClient.setEx(key, ttl, JSON.stringify(initialData));
  }
  
  async deleteSession(sessionId: string): Promise<void> {
    const key = (this.prefix + sessionId).toString();
    await this.RedisClient.del(key);
}

async persistSessionData(
    sessionId: string,
    sessionData: SessionData
    ): Promise<void> {
        const key = (this.prefix + sessionId).toString();
        const ttl = this.ttl;
        await this.RedisClient.setEx(key, ttl, JSON.stringify(sessionData));
    }
}

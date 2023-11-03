# connect-redis-hono

Redis session store-connector to work with [hono-sessions](https://github.com/jcs224/hono_sessions)

## Installation

```sh
$ bun i connect-redis-hono
```


## Usage

```js
import { Hono } from "hono";
import { sessionMiddleware } from "hono-sessions";
import { BunRedisStore } from "connect-redis-hono";

// ...
// create your RedisClient and connect to your redis server
// ...

const store = new BunRedisStore({
prefix: "AppPrefix:", 
ttl: 3600, // seconds
client: RedisClient, 
});

const app = new Hono();

app.use(sessionMiddleware({
    store, // pass your store
    // ...other session options    
}));

app.get("/", (ctx) => {
    return ctx.text("Session data stored on Redis");
});

export default {
    port: 3000,
    fetch: app.fetch,
  };
  
```

## Redis client
As of right now this package is only compatible with [node-redis](https://www.npmjs.com/package/redis), but making it compatible with [ioredis](https://www.npmjs.com/package/ioredis) is trivial, feel free to make a PR.

## License
[MIT](LICENSE)

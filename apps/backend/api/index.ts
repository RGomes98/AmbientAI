import { core } from '../src/plugins/core.plugin';
import { app } from '../src/config/app.config';
import { ENV } from '../src/env';

// Routes
import { base } from '../src/routes/base.routes';
import { example } from '../src/routes/example.routes';

// Register plugins and routes
app.register(core);
app.register(base);
app.register(example);

if (ENV.NODE_ENV === 'development') {
  (async function initDevServer() {
    try {
      await app.listen({ port: ENV.PORT });
      console.log(`Server listening at http://localhost:${ENV.PORT}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}

// Vercel's serverless function entry point
export default async function handler(request: any, reply: any) {
  await app.ready();
  app.server.emit('request', request, reply);
}

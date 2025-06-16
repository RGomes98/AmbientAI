import { base } from '../src/routes/base.routes';
import { auth } from '../src/routes/auth.routes';

import { app } from '../src/config/app.config';
import { ENV } from '../src/env';

// Routes
app.register(base);
app.register(auth);

// Development Server
if (ENV.NODE_ENV === 'development') {
  (async function initDevServer() {
    try {
      await app.listen({ port: ENV.PORT });
      console.log(`Server listening at http://localhost:${ENV.PORT}`);
    } catch (error) {
      console.error(`Failed to start the development server:`, error);
      process.exit(1);
    }
  })();
}

// Vercel's Serverless Function Entry Point
export default async function handler(request: any, reply: any) {
  await app.ready();
  app.server.emit('request', request, reply);
}

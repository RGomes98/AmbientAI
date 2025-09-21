import { airQuality } from '../src/routes/air-quality.routes';
import { base } from '../src/routes/base.routes';
import { auth } from '../src/routes/auth.routes';

import { app } from '../src/config/app.config';
import { ENV } from '../src/env';

// Routes
app.register(base);
app.register(auth);
app.register(airQuality);

// Server Entry Point
(async function initServer() {
  try {
    await app.listen({ port: ENV.PORT, host: '0.0.0.0' });
    console.info(`Server listening at http://localhost:${ENV.PORT}`);
  } catch (error) {
    console.error('Failed to start the development server:', error);
    process.exit(1);
  }
})();

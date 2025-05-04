import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { core } from '@/plugins/core.plugin';
import { ENV } from '@/config/env.config';
import { app } from '@/config/app.config';

// Routes
import { example } from '@/routes/example.routes';

// Set Zod-based validator and serializer for Fastify
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register plugins and routes
app.register(core);
app.register(example);

(async () => {
  try {
    await app.listen({ port: ENV.PORT });
    console.log(`Server listening at http://localhost:${ENV.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();

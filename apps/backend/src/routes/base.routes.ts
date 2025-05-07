import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyTypedInstance } from '../config/app.config';
import { readFileContent } from '../utils/readFileContent.util';
import { ENV } from '../env';

const rawVersion = readFileContent('../../VERSION');
const appVersion = ENV.NODE_ENV === 'development' ? (rawVersion ? `v${rawVersion}` : 'unknown') : 'PROD';

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>AmbientAI API</title>
    <meta
      name="description"
      content="AmbientAI API é uma API moderna construída com Fastify e Zod, pronta para ambientes serverless como Vercel."
    />
  </head>
  <body style="padding-block: 0; padding-inline: 1rem; height: 100vh; display: flex; flex-direction: column; justify-content: center;">
    <h1>AmbientAI API <code>${appVersion}</code></h1>
    <p>
      Construída com <code>Fastify</code> para alto desempenho e <code>Zod</code> para validação de dados e tipagem segura. Foi projetada para rodar em ambientes serverless, como <strong>Vercel</strong>, garantindo facilidade de deploy e manutenção.
    </p>

    <h2>Documentação</h2>
    <p>
      Em modo desenvolvimento, você pode acessar a documentação da API em <a href="/docs"><code>/docs</code></a> para explorar os endpoints disponíveis.
    </p>

    <h2>Stack</h2>
    <ul>
      <li><code>Fastify</code> – Framework de servidor web rápido e leve.</li>
      <li><code>Zod</code> – Biblioteca para validação e tipagem de dados.</li>
      <li><code>@fastify/swagger</code> – Para gerar e servir a documentação Swagger da API.</li>
      <li><code>@fastify/rate-limit</code> – Controle de taxa de requisições.</li>
      <li><code>@fastify/cors</code> – Configuração de CORS flexível, permitindo o controle de acesso entre domínios.</li>
    </ul>
  </body>
</html>
`;

export const base = async (instance: FastifyTypedInstance) => {
  instance.get('/', { schema: { hide: true } }, async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).type('text/html').send(html);
  });
};

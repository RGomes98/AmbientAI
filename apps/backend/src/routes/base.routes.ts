import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import type { FastifyTypedInstance } from '../config/app.config';
import { File } from '../utils/file.util';

const version = File.readContent('VERSION', z.string());

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
    <title>AmbientAI</title>
    <meta
      name="description"
      content="AmbientAI API é uma API moderna construída com Fastify, TypeScript, Zod e Prisma, pronta para ambientes serverless como Vercel."
    />
  </head>
  <body style="padding-block: 2rem; padding-inline: 1.5rem; min-height: calc(100vh - 4rem); display: flex; flex-direction: column; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 8px; border-bottom: 1px solid var(--nc-bg-2);">
      <h1 style="margin-bottom: 0; padding-top: 0; border-bottom: 0;">AmbientAI API</h1>
      <code aria-label="API Version" style="color: var(--nc-tx-1); font-weight: bold; line-height: initial;">${version ? `v${version}` : 'unknown'}</code>
    </div>
    <p>
      Construída com <code>Fastify</code> para alto desempenho, <code>TypeScript</code> para tipagem segura, <code>Zod</code> para validação de dados e <code>Prisma</code> como ORM. Foi projetada para rodar em ambientes serverless, como <strong>Vercel</strong>, garantindo facilidade de deploy e manutenção.
    </p>
    <h2>Documentação</h2>
    <p>
      Em modo desenvolvimento, você pode acessar a documentação da API em <a href="/docs"><code>/docs</code></a> para explorar os endpoints disponíveis.
    </p>
    <h2>Stack</h2>
    <ul>
      <li><code>Fastify</code> – Framework de servidor web rápido e leve.</li>
      <li><code>TypeScript</code> – Tipagem estática para maior segurança em tempo de desenvolvimento.</li>
      <li><code>Zod</code> – Biblioteca para validação e tipagem de dados.</li>
      <li><code>Prisma</code> – ORM moderno para PostgreSQL.</li>
      <li><code>@fastify/swagger</code> – Para gerar e servir a documentação Swagger da API.</li>
      <li><code>@fastify/jwt</code> – Autenticação baseada em JWT.</li>
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

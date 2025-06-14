# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Added

- Authentication module:

  - Added user authentication flow including controllers, services, repositories, domains, routes, plugins, utils, and validators.
  - Introduced role validation for authenticated sessions.

- Error handling:

  - Implemented a global error handler for consistent error responses.
  - Added support for custom HTTP exceptions.

- Database:

  - Updated the Prisma database schema to support authentication and roles.

- Environment configuration:

  - Updated `.env.example` documentation with new variables required for authentication.

### Changed

- Project structure:

  - Improved overall app folder organization to follow domain-driven patterns.

- Routing:

  - Removed example routes.

- Database:

  - Added initial Prisma setup for PostgreSQL:

    - Created `schema.prisma` with datasource and generator configurations.
    - Added environment variables `POSTGRES_DATABASE_URL` and `POSTGRES_DATABASE_URL_NON_POOLING`.
    - Introduced `prisma` singleton instance for database access (`src/lib/database/prisma.database.ts`).

  - Extended environment schema validation (`EnvSchema`) to include new database environment variables.

## [1.0.0]

### Added

- Initial implementation of AmbientAI API using Fastify with Zod-based schema validation and type-safe routing.
- Core plugin setup including:
  - CORS configuration.
  - Swagger documentation with `@fastify/swagger` and `@fastify/swagger-ui`.
  - Rate limiting in production via `@fastify/rate-limit`.
- Environment configuration using Zod schema validation.
- Basic route (`GET /`) serving static HTML with project description and stack info.
- Example CRUD endpoints:
  - `POST /example/users` – Create a new user.
  - `GET /example/users` – List users, supports optional `search` query.
  - `PATCH /example/users/:id` – Update a user by ID.
  - `DELETE /example/users/:id` – Delete a user by ID.
- Serverless-compatible entry point (`export default handler`) for Vercel deployment.
- TypeScript setup with Fastify type provider and Zod integration.
- Created CHANGELOG.md and README.md:
  - Created initial CHANGELOG.md to track changes.
  - Added README.md with setup instructions.
- Introduced centralized version management using the `VERSION` environment variable in `vercel.json` (used in Swagger and landing page).
- `readFileContent`: Utility function to read and validate file contents using a Zod schema, with robust error handling and optional JSON selection.

### Infrastructure

- Added `.vercel.json` for route rewrites to support Vercel deployment.
- Configured `dev` script using `tsx` with `.env.local` support.

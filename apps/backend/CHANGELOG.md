# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Added

- API Keys system:

  - Introduced API key hashing, validation, and storage mechanism.
  - Implemented `ApiKeyGuard` for API key-based authentication.
  - Defined API key format validation (`ard_` prefix) using Zod schemas.

### Changed

- Refactored project structure:

  - Removed legacy route decorators.
  - Improved plugin naming conventions for better clarity and maintainability.

- Improved Zod schema structures:

  - Modularized and cleaned up existing schemas.
  - Enhanced validation error messages for better API client feedback.

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

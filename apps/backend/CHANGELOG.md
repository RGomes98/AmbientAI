# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Created CHANGELOG.md, README.md, and VERSION:
  - Created initial CHANGELOG.md to track changes.
  - Added README.md with setup instructions.
  - Introduced VERSION in project files (e.g., Swagger and landing page).
- `readFileContent` utility function: Added a function to safely read file content with error handling for empty or invalid files.

### Infrastructure

- Added `.vercel.json` for route rewrites to support Vercel deployment.
- Configured `dev` script using `tsx` with `.env.local` support.

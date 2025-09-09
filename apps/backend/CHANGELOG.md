# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.0]

### Added

- New mock dataset with real Arduino payload structure for more realistic testing and development.

### Changed

- Air Quality module:
  - Updated `AirQualityMeasurement` database model to reflect real fields from Arduino payload.
  - Renamed endpoints, services, controllers, and validators for clarity and consistency.
  - Added endpoint, service, controller, and validator for weekly air quality averages.

- Authentication:
  - Improved error message handling for login-related responses, providing clearer feedback to frontend clients.

- Configuration:
  - Reorganized `.env` schema structure for better readability and maintainability.
  - Updated how the API version is retrieved for consistent access across the project.

### Fixed

- Air Quality endpoints:
  - Corrected validation of `GET /air-quality/latest` response in case of null database values.
  - Ensured proper chronological ordering of entries for `GET /air-quality/latest`.

## [4.0.0]

### Added

- New endpoint to retrieve the latest air quality data.
- Added `take` query parameter to control the number of data entries returned by the API.

### Changed

- Adjusted the order of returned air quality data based on timestamp for accurate chronological display.
- Minor improvements to API logging for better debugging and monitoring.

## [3.0.0]

### Added

- Air Quality module:
  - Added routes, controllers, services, repositories, validators, and domain logic for Air Quality.
  - Introduced a helper class to dynamically build queries related to air quality measurements.
  - Added new Prisma model/table `AirQualityMeasurement` for storing air quality data.
  - Created a database seeder class with helper functions to populate the database with mock air quality data.

### Changed

- Project structure:
  - Major refactor across domain folders.
  - Improved folder organization, variable naming conventions, and overall code structure.
  - Introduced new helper functions, schemas, types, and validators for better modularity.

- Configuration:
  - Updated Turborepo variables in `turbo.json`.
  - Updated `.gitignore` entries.

- Documentation:
  - Updated README with the latest instructions and project information.

### Fixed

- Error handling:
  - Fixed conditional response logic in the global error handler.

### Maintenance

- Minor code improvements for readability and maintainability.

## [2.0.0]

### Added

- API Keys system:
  - Introduced API key hashing, validation, and storage mechanism.
  - Implemented `ApiKeyGuard` for API key-based authentication.
  - Defined API key format validation (`ard_` prefix) using Zod schemas.

- Authentication module:
  - Added user authentication flow including controllers, services, repositories, domains, routes, plugins, utils, and validators.
  - Introduced role validation for authenticated sessions.

- Error handling:
  - Implemented a global error handler for consistent error responses.
  - Added support for custom HTTP exceptions.

- Database:
  - Updated the Prisma database schema to support authentication and roles.

  - Added initial Prisma setup for PostgreSQL:
    - Created `schema.prisma` with datasource and generator configurations.
    - Added environment variables `POSTGRES_DATABASE_URL` and `POSTGRES_DATABASE_URL_NON_POOLING`.
    - Introduced `prisma` singleton instance for database access (`src/lib/database/prisma.database.ts`).

  - Environment configuration:
    - Extended `.env.example` documentation with new variables required for authentication.
    - Extended environment schema validation (`EnvSchema`) to include new database environment variables.

### Changed

- Refactored project structure:
  - Removed legacy route decorators.
  - Improved plugin naming conventions for better clarity and maintainability.
  - Improved overall app folder organization to follow domain-driven patterns.

- Improved Zod schema structures:
  - Modularized and cleaned up existing schemas.
  - Enhanced validation error messages for better API client feedback.

- Routing:
  - Removed example routes.

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

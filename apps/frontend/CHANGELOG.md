# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1]

### Changed

- Enhanced dashboard responsiveness for screen resolutions larger than 1080p.

## [2.0.0]

### Added

- Login page with full authentication flow.
- `.env.example` file with updated environment variables.
- Custom `HttpError` class with `from` method for consistent error handling.
- Logout button for session management.
- Display of latest data information in the header.
- Dark mode support for the entire application.
- Fully responsive design across all screen sizes.
- Full coverage for empty states across all components (handles scenarios with no data)
- Updated section cards to include weekly averages comparisons.
- Introduced extra gauge charts to display newly available air quality data.
- New schemas and services related to weekly averages.

### Changed

- Refactored `Components` folder structure for better organization.
- General layout improvements and UI refinements.
- Improved `calculateAqi` logic for more accurate air quality calculations.

### Fixed

- Corrected `SessionProvider` placement to ensure proper usability.
- Fixed errors related to `tspan` in the `GaugeChart` component.

## [1.0.0]

### Added

- Initial frontend setup: installed dependencies, configured Prettier, ShadcnUI, Next.js, and environment variables.
- First version of the **Dashboard page** for viewing air quality data.
- Basic session control and authentication flow.
- Services for communicating with the backend API.

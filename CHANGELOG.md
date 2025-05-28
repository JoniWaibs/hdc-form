# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Resource API with CRUD operations
- New resource management page
- Enhanced UX improvements
- Comprehensive test coverage

### Changed

- Implemented real-time updates for resources page
- Modified API route configuration to support dynamic data
- Optimized Next.js configuration for real-time data handling
- Resolved build issues related to dynamic server usage
- Improved Jest configuration
- Enhanced form validations
- Optimized database queries
- Updated UI text from "Número de Sesiones" to "Cantidad de Encuentros"
- Enhanced ResourcesCards layout and responsiveness
- Improved date display in resource cards
- Migrated calendar component to use DayPicker directly

### Technical

- Added `dynamic = "force-dynamic"` in resources page
- Removed cache and revalidation in resource endpoints
- Updated fetch configuration to maintain fresh data
- Type-safe operations implementation
- Better error handling
- Performance optimizations
- Removed redundant calendar component and integrated DayPicker directly
- Improved grid layout for resource cards

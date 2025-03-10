# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2024-03-10

### Added
- Enhanced documentation for Dockerfile with detailed explanations for each section and command
- Improved docker-compose.yml documentation with comprehensive comments for better understanding
- Added section headers and detailed descriptions for Docker configuration components

## [1.1.9] - 2024-03-10

### Fixed
- Added explicit permissions for GitHub Actions workflows to access package registry
- Fixed "installation not allowed to Create organization package" error in CI/CD pipelines

## [1.1.8] - 2024-03-10

### Fixed
- Updated MongoDB Memory Server configuration to use version 7.0.3
- Changed Docker test stage base image to node:18.19-bullseye for MongoDB 7.0.3 compatibility
- Increased Jest timeout to prevent test timeout errors

## [1.1.7] - 2024-03-10

### Fixed
- GitHub Actions workflows now use lowercase repository names for Docker images
- Fixed Docker image push errors in CI/CD pipelines

## [1.1.6] - 2024-03-10

### Fixed
- Test stage in Dockerfile now uses Debian-based Node.js image for MongoDB compatibility
- Resolved mongodb-memory-server compatibility issues in Docker tests

## [1.1.5] - 2024-03-10

### Changed
- Modified Dockerfile to use .env.example instead of .env
- Improved Docker build process for environment configuration

## [1.1.4] - 2024-03-10

### Added
- Environment configuration file (.env) for Docker builds
- Default environment variables for development and production

### Fixed
- Docker build process by including required .env file
- MongoDB connection configuration for different environments

## [1.1.3] - 2024-03-10

### Added
- Email validation in User model with custom error messages
- TypeScript type safety improvements for validation

### Fixed
- User model now properly validates email format
- All tests passing with 100% coverage

## [1.1.2] - 2024-03-10

### Fixed
- Fixed User model validation tests
- Updated Jest configuration to exclude test helpers
- Improved test assertions for better error handling
- Updated test coverage thresholds to 85%

## [1.1.1] - 2024-03-10

### Fixed
- Resolved dependency conflicts in package.json
- Updated mongoose to version 7.5.0 for better compatibility
- Fixed mongodb-memory-server version mismatch
- Regenerated package-lock.json with correct dependencies

## [1.1.0] - 2024-03-10

### Added
- Jest testing configuration
- Test coverage thresholds (60% for development, 85% for production)
- Docker containerization
- CI/CD pipelines with GitHub Actions
- Automated testing and building workflows
- Container registry integration
- Version control documentation

### Changed
- Updated CI pipeline to use Docker Buildx
- Improved test execution in CI environment
- Optimized Docker build caching
- Enhanced GitHub Actions workflow reliability

## [1.0.0] - 2024-03-10

### Added
- Initial API setup with TypeScript and Express
- MongoDB integration with Mongoose
- User collection with CRUD operations
- Bike collection with CRUD operations
- Car collection with CRUD operations
- Basic error handling and response formatting
- Environment configuration
- Development and production scripts 
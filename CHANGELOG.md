# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2023-11-16

### Fixed
- Updated Railway deployment GitHub Action to use the current recommended approach
- Fixed "Missing download info for railway/railway-github-action@v1" error
- Replaced outdated Railway GitHub Action with direct Railway CLI usage
- Improved deployment workflow reliability

## [1.3.0] - 2023-11-15

### Added
- Railway deployment integration
- Health check endpoint at `/api/health`
- Optimized railway.json configuration
- MongoDB connection improvements for cloud deployment

### Changed
- Updated CI/CD pipelines to work with Railway's automatic deployment
- Improved database connection error handling
- Updated documentation with Railway deployment instructions

### Fixed
- MongoDB connection issue in Railway environment
- Fixed IPv6 connection attempts that were causing errors

## [1.2.0] - 2023-10-30

### Added
- Docker configuration enhancements
- GitHub Actions workflow optimizations

### Fixed
- MongoDB compatibility issues
- Test environment configuration

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

## [1.1.1] - 2023-10-15

### Fixed
- Dependency conflict resolutions
- Test fixes and improvements

## [1.1.0] - 2023-10-01

### Added
- Testing with Jest and MongoDB Memory Server
- Docker multi-stage builds
- CI/CD pipelines with GitHub Actions

## [1.0.0] - 2023-09-15

### Added
- Initial API setup with Express and TypeScript
- MongoDB integration with Mongoose
- CRUD operations for Users, Bikes, and Cars
- Basic error handling and validation 
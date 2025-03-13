# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.1] - 2023-11-26

### Changed
- Removed redundant consolidated.yml workflow file
- Simplified GitHub Actions configuration to use only separate CI and CD pipelines

## [1.4.0] - 2023-11-25

### Added
- Created separate CI and CD pipelines with different coverage thresholds (60% for CI, 85% for CD)
- Added MongoDB binary caching in GitHub Actions to improve test performance

### Changed
- Increased Jest timeout to 5 minutes (300000ms) for all tests
- Updated MongoDB Memory Server configuration for better stability
- Improved error handling in database test helpers

### Fixed
- Fixed MongoDB Memory Server timeout issues in GitHub Actions
- Added explicit timeouts to all test hooks and test cases
- Resolved "Cannot read properties of undefined (reading 'stop')" error in dbHandler.ts
- Fixed "Operation buffering timed out" errors in Mongoose operations

## [1.3.9] - 2023-11-24

### Added
- Comprehensive Railway API testing guide with Postman to project overview
- Detailed examples for testing all API endpoints
- Troubleshooting section for Railway deployments
- Advanced testing techniques for API validation

## [1.3.8] - 2023-11-23

### Changed
- Removed unnecessary deployment files to focus exclusively on Railway
- Simplified deployment configuration

### Removed
- Deleted Procfile (Heroku-specific file)
- Removed redundant railway.toml file
- Cleaned up temporary workflow scripts (debug-workflows.js, cleanup-workflows.js)

## [1.3.7] - 2023-11-22

### Changed
- Completely removed all Railway CLI references from the codebase
- Created a single consolidated workflow file (consolidated.yml) that handles both CI and CD
- Simplified GitHub Actions configuration to work seamlessly with Railway's automatic deployment
- Improved Docker image tagging and versioning

### Fixed
- Fixed persistent "Project Token not found" error by removing all Railway CLI deployment steps
- Ensured complete compatibility with Railway's GitHub integration for automatic deployments
- Removed redundant workflow files to prevent conflicts

## [1.3.6] - 2023-11-21

### Changed
- Consolidated all GitHub Actions workflows into a single main.yml file
- Simplified CI/CD pipeline structure
- Improved version extraction and tagging for Docker images

### Fixed
- Fixed persistent "Project Token not found" error in GitHub Actions
- Removed all references to Railway CLI deployment
- Ensured complete compatibility with Railway's automatic deployment

## [1.3.5] - 2023-11-20

### Changed
- Removed Railway CLI deployment steps from GitHub Actions workflows
- Renamed railway-deploy.yml to test-and-build.yml to better reflect its purpose
- Simplified CI/CD pipeline to work with Railway's automatic deployments

### Fixed
- Fixed "Project Token not found" error in GitHub Actions
- Aligned GitHub Actions workflows with Railway's GitHub integration

## [1.3.4] - 2023-11-19

### Changed
- Improved MongoDB connection error handling
- Enhanced logging for MongoDB connection attempts
- Removed fallback to localhost MongoDB in Railway environment

### Fixed
- Fixed MongoDB connection issues in Railway environment
- Added better error messages for missing MongoDB URI

## [1.3.3] - 2023-11-18

### Changed
- Made health endpoint independent of MongoDB connection
- Enhanced logging for health endpoint
- Improved application startup to ensure health endpoint is always available
- Added version information to health endpoint response

### Fixed
- Fixed Railway deployment healthcheck failures
- Prevented application from exiting when MongoDB connection fails

## [1.3.2] - 2023-11-17

### Fixed
- Updated Railway healthcheck path to use the root-level `/health` endpoint
- Fixed Railway deployment healthcheck failure
- Ensured proper health monitoring for deployed application

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
# DevOps API: Comprehensive Project Overview

## Project Architecture and Components

The DevOps API is a TypeScript-based REST API built with Express.js and MongoDB, designed to manage three primary entities: Users, Bikes, and Cars. The application follows a structured MVC (Model-View-Controller) architecture:

### Core Components

1. **Models Layer**: 
   - Defines data schemas using Mongoose
   - Implements validation logic (e.g., email validation in User model)
   - Three primary models: User, Bike, and Car

2. **Controllers Layer**:
   - Handles business logic
   - Processes requests and returns responses
   - Separated by resource type (users, bikes, cars)

3. **Routes Layer**:
   - Defines API endpoints
   - Maps HTTP methods to controller functions
   - Organized by resource (userRoutes, bikeRoutes, carRoutes)

4. **Configuration**:
   - Environment variables managed through dotenv
   - Database connection setup in config/database.ts
   - Separate configurations for development and production

## Testing Strategy

The project implements a robust testing strategy using Jest and MongoDB Memory Server:

### Testing Approach

1. **Test Structure**:
   - Unit tests for models (User, Bike, Car)
   - Helper utilities for database operations during tests
   - In-memory MongoDB for isolated test environments

2. **Database Testing**:
   - `dbHandler.ts` provides utilities to:
     - Connect to an in-memory MongoDB instance
     - Clear the database between tests
     - Close connections after tests complete
   - MongoDB Memory Server configured to use version 7.0.3 for compatibility

3. **Test Coverage**:
   - Development threshold: 60% for branches, functions, lines, and statements
   - Production threshold: 85% for branches, functions, lines, and statements
   - Coverage reports generated during CI/CD pipeline execution
   - Jest configured to exclude test helpers from coverage calculations

## Docker Configuration

The project uses a sophisticated multi-stage Docker build process:

### Docker Implementation

1. **Multi-stage Dockerfile**:
   - **Builder Stage**: Compiles TypeScript to JavaScript
   - **Test Stage**: Runs tests with full dependencies using node:18.19-bullseye
   - **Production Stage**: Creates minimal image with only production dependencies

2. **Environment Configuration**:
   - Uses .env.example as a template for environment variables
   - Docker containers configured to use environment variables for configuration
   - Production stage optimized for minimal size and security

3. **Docker Compose**:
   - Defines services for development, testing, and production
   - Simplifies local development and testing
   - Configures networking and dependencies

## CI/CD Pipelines

The project implements a comprehensive CI/CD workflow using GitHub Actions and Railway:

### Pipeline Structure

1. **CI Pipeline** (.github/workflows/ci.yml):
   - Triggered on pushes to main and pull requests
   - Builds and runs tests in Docker environment
   - Validates test coverage (minimum 60%)
   - Builds and pushes Docker image to GitHub Container Registry
   - Uses lowercase repository names for Docker images
   - Has explicit permissions for package registry access

2. **CD Pipeline** (.github/workflows/cd.yml):
   - Triggered on version tags (v*)
   - Runs tests with stricter coverage requirements (85%)
   - Builds production Docker image
   - Pushes to GitHub Container Registry with version tag
   - Updates latest tag
   - Has explicit permissions for package registry access

3. **Railway Deployment**:
   - Automatic deployment through Railway's GitHub integration
   - Deploys on pushes to main branch and version tags
   - Uses Docker image directly from the repository
   - Provides production hosting with automatic scaling
   - Includes health monitoring via `/api/health` endpoint

### Pipeline Validation

- Both pipelines include test validation steps
- Pipeline execution stops if tests fail
- Coverage thresholds must be met (60% for CI, 85% for CD)
- No tests with errors are allowed to proceed
- Railway monitors application health after deployment

## Project Evolution

The CHANGELOG.md reveals a series of improvements over time:

1. **Version 1.0.0**: Initial API setup with basic CRUD operations
2. **Version 1.1.0**: Added testing, Docker, and CI/CD pipelines
3. **Version 1.1.1-1.2.0**: Incremental improvements including:
   - Dependency conflict resolutions
   - Test fixes and improvements
   - Docker configuration enhancements
   - MongoDB compatibility fixes
   - GitHub Actions workflow optimizations
   - Enhanced documentation

## Key Technical Decisions

1. **MongoDB Memory Server for Testing**:
   - Provides isolated test environments
   - Prevents test data from affecting production
   - Configured to use version 7.0.3 for compatibility with Debian 12

2. **Multi-stage Docker Builds**:
   - Optimizes image size for production
   - Separates build, test, and runtime environments
   - Improves security by minimizing included dependencies

3. **GitHub Container Registry**:
   - Stores Docker images alongside code
   - Integrates with GitHub Actions
   - Provides versioned container images

4. **TypeScript**:
   - Adds type safety to JavaScript
   - Improves developer experience
   - Catches errors at compile time

## API Endpoints

The API provides RESTful endpoints for three main resources:

1. **Users**:
   - CRUD operations for user management
   - Email validation for data integrity

2. **Bikes**:
   - Complete bike management functionality
   - Model and name tracking

3. **Cars**:
   - Full car resource management
   - Similar structure to bikes for consistency

## API Usage Guide

This section provides detailed instructions on how to interact with each API endpoint, including example requests and responses.

### Running the API

Before testing the API, make sure it's running:

```bash
# Using Docker Compose (recommended)
docker-compose up

# Or run locally with Node.js
npm run dev

# Or access the deployed version on Railway
https://your-project-name.railway.app
```

The API will be available at `http://localhost:3000` locally or at your Railway URL.

### User Operations

#### 1. Create a User

**Request:**
- Method: POST
- URL: `http://localhost:3000/api/users`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Example using cURL:**
```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
}'
```

**Example using Postman:**
1. Set method to POST
2. Enter URL: `http://localhost:3000/api/users`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-03-10T15:46:28.532Z",
  "updatedAt": "2023-03-10T15:46:28.532Z"
}
```

#### 2. Get All Users

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/users`

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/users
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/users`
3. Click Send

**Expected Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-03-10T15:46:28.532Z",
    "updatedAt": "2023-03-10T15:46:28.532Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2023-03-10T15:47:28.532Z",
    "updatedAt": "2023-03-10T15:47:28.532Z"
  }
]
```

#### 3. Get User by ID

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/users/:id`
  (Replace `:id` with the actual user ID)

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/users/60d21b4667d0d8992e610c85
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/users/60d21b4667d0d8992e610c85`
3. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-03-10T15:46:28.532Z",
  "updatedAt": "2023-03-10T15:46:28.532Z"
}
```

#### 4. Update User

**Request:**
- Method: PUT
- URL: `http://localhost:3000/api/users/:id`
  (Replace `:id` with the actual user ID)
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com"
}
```

**Example using cURL:**
```bash
curl -X PUT \
  http://localhost:3000/api/users/60d21b4667d0d8992e610c85 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
}'
```

**Example using Postman:**
1. Set method to PUT
2. Enter URL: `http://localhost:3000/api/users/60d21b4667d0d8992e610c85`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "createdAt": "2023-03-10T15:46:28.532Z",
  "updatedAt": "2023-03-10T15:50:28.532Z"
}
```

#### 5. Delete User

**Request:**
- Method: DELETE
- URL: `http://localhost:3000/api/users/:id`
  (Replace `:id` with the actual user ID)

**Example using cURL:**
```bash
curl -X DELETE http://localhost:3000/api/users/60d21b4667d0d8992e610c85
```

**Example using Postman:**
1. Set method to DELETE
2. Enter URL: `http://localhost:3000/api/users/60d21b4667d0d8992e610c85`
3. Click Send

**Expected Response:**
```json
{
  "message": "User deleted successfully"
}
```

### Bike Operations

#### 1. Create a Bike

**Request:**
- Method: POST
- URL: `http://localhost:3000/api/bikes`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Mountain Bike",
  "model": "Trek X-Caliber 8"
}
```

**Example using cURL:**
```bash
curl -X POST \
  http://localhost:3000/api/bikes \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Mountain Bike",
    "model": "Trek X-Caliber 8"
}'
```

**Example using Postman:**
1. Set method to POST
2. Enter URL: `http://localhost:3000/api/bikes`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "name": "Mountain Bike",
  "model": "Trek X-Caliber 8",
  "createdAt": "2023-03-10T16:00:28.532Z",
  "updatedAt": "2023-03-10T16:00:28.532Z"
}
```

#### 2. Get All Bikes

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/bikes`

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/bikes
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/bikes`
3. Click Send

**Expected Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c87",
    "name": "Mountain Bike",
    "model": "Trek X-Caliber 8",
    "createdAt": "2023-03-10T16:00:28.532Z",
    "updatedAt": "2023-03-10T16:00:28.532Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c88",
    "name": "Road Bike",
    "model": "Specialized Tarmac",
    "createdAt": "2023-03-10T16:01:28.532Z",
    "updatedAt": "2023-03-10T16:01:28.532Z"
  }
]
```

#### 3. Get Bike by ID

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/bikes/:id`
  (Replace `:id` with the actual bike ID)

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87`
3. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "name": "Mountain Bike",
  "model": "Trek X-Caliber 8",
  "createdAt": "2023-03-10T16:00:28.532Z",
  "updatedAt": "2023-03-10T16:00:28.532Z"
}
```

#### 4. Update Bike

**Request:**
- Method: PUT
- URL: `http://localhost:3000/api/bikes/:id`
  (Replace `:id` with the actual bike ID)
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Mountain Bike Updated",
  "model": "Trek X-Caliber 9"
}
```

**Example using cURL:**
```bash
curl -X PUT \
  http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Mountain Bike Updated",
    "model": "Trek X-Caliber 9"
}'
```

**Example using Postman:**
1. Set method to PUT
2. Enter URL: `http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "name": "Mountain Bike Updated",
  "model": "Trek X-Caliber 9",
  "createdAt": "2023-03-10T16:00:28.532Z",
  "updatedAt": "2023-03-10T16:05:28.532Z"
}
```

#### 5. Delete Bike

**Request:**
- Method: DELETE
- URL: `http://localhost:3000/api/bikes/:id`
  (Replace `:id` with the actual bike ID)

**Example using cURL:**
```bash
curl -X DELETE http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87
```

**Example using Postman:**
1. Set method to DELETE
2. Enter URL: `http://localhost:3000/api/bikes/60d21b4667d0d8992e610c87`
3. Click Send

**Expected Response:**
```json
{
  "message": "Bike deleted successfully"
}
```

### Car Operations

#### 1. Create a Car

**Request:**
- Method: POST
- URL: `http://localhost:3000/api/cars`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Sedan",
  "model": "Toyota Camry"
}
```

**Example using cURL:**
```bash
curl -X POST \
  http://localhost:3000/api/cars \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Sedan",
    "model": "Toyota Camry"
}'
```

**Example using Postman:**
1. Set method to POST
2. Enter URL: `http://localhost:3000/api/cars`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c89",
  "name": "Sedan",
  "model": "Toyota Camry",
  "createdAt": "2023-03-10T16:10:28.532Z",
  "updatedAt": "2023-03-10T16:10:28.532Z"
}
```

#### 2. Get All Cars

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/cars`

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/cars
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/cars`
3. Click Send

**Expected Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c89",
    "name": "Sedan",
    "model": "Toyota Camry",
    "createdAt": "2023-03-10T16:10:28.532Z",
    "updatedAt": "2023-03-10T16:10:28.532Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c90",
    "name": "SUV",
    "model": "Honda CR-V",
    "createdAt": "2023-03-10T16:11:28.532Z",
    "updatedAt": "2023-03-10T16:11:28.532Z"
  }
]
```

#### 3. Get Car by ID

**Request:**
- Method: GET
- URL: `http://localhost:3000/api/cars/:id`
  (Replace `:id` with the actual car ID)

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/cars/60d21b4667d0d8992e610c89
```

**Example using Postman:**
1. Set method to GET
2. Enter URL: `http://localhost:3000/api/cars/60d21b4667d0d8992e610c89`
3. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c89",
  "name": "Sedan",
  "model": "Toyota Camry",
  "createdAt": "2023-03-10T16:10:28.532Z",
  "updatedAt": "2023-03-10T16:10:28.532Z"
}
```

#### 4. Update Car

**Request:**
- Method: PUT
- URL: `http://localhost:3000/api/cars/:id`
  (Replace `:id` with the actual car ID)
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Sedan Updated",
  "model": "Toyota Camry Hybrid"
}
```

**Example using cURL:**
```bash
curl -X PUT \
  http://localhost:3000/api/cars/60d21b4667d0d8992e610c89 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Sedan Updated",
    "model": "Toyota Camry Hybrid"
}'
```

**Example using Postman:**
1. Set method to PUT
2. Enter URL: `http://localhost:3000/api/cars/60d21b4667d0d8992e610c89`
3. Go to Body tab, select "raw" and "JSON"
4. Enter the JSON data above
5. Click Send

**Expected Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c89",
  "name": "Sedan Updated",
  "model": "Toyota Camry Hybrid",
  "createdAt": "2023-03-10T16:10:28.532Z",
  "updatedAt": "2023-03-10T16:15:28.532Z"
}
```

#### 5. Delete Car

**Request:**
- Method: DELETE
- URL: `http://localhost:3000/api/cars/:id`
  (Replace `:id` with the actual car ID)

**Example using cURL:**
```bash
curl -X DELETE http://localhost:3000/api/cars/60d21b4667d0d8992e610c89
```

**Example using Postman:**
1. Set method to DELETE
2. Enter URL: `http://localhost:3000/api/cars/60d21b4667d0d8992e610c89`
3. Click Send

**Expected Response:**
```json
{
  "message": "Car deleted successfully"
}
```

### Testing with Postman

For easier testing, you can import a Postman collection:

1. Open Postman
2. Click "Import" button
3. Create a new collection named "DevOps API"
4. Add folders for "Users", "Bikes", and "Cars"
5. Create requests for each operation as described above
6. Save the requests in the appropriate folders

This will give you a reusable collection of API requests for testing.

---

# Potential Questions and Answers

## CI/CD Pipeline Questions

1. **Q: Why did you choose GitHub Actions for your CI/CD pipelines?**
   - A: GitHub Actions was chosen because it integrates seamlessly with our GitHub repository, provides free minutes for public repositories, and offers a wide range of pre-built actions. It also allows us to define workflows as code in YAML files, making them version-controlled alongside our application code.

2. **Q: How do your CI and CD pipelines differ, and why did you separate them?**
   - A: The CI pipeline runs on every push to main and pull requests, focusing on quick validation with a lower coverage threshold (60%). The CD pipeline runs only on version tags, has stricter coverage requirements (85%), and deploys to production. This separation allows for frequent integration testing without requiring production-level quality for every commit, while ensuring that only properly versioned and thoroughly tested code reaches production.

3. **Q: How do you ensure that failing tests stop the pipeline?**
   - A: Both pipelines execute tests with the npm test command, which is configured to return a non-zero exit code if any tests fail or if coverage thresholds aren't met. GitHub Actions automatically stops the workflow if any step returns a non-zero exit code, effectively preventing deployment of code that doesn't meet our quality standards.

4. **Q: How do you handle different environment configurations in your pipelines?**
   - A: We use environment variables in our GitHub Actions workflows to configure different settings for test and production environments. The CD pipeline also modifies the Jest configuration to enforce higher coverage thresholds for production deployments.

## Docker Questions

1. **Q: Why did you implement a multi-stage Docker build?**
   - A: The multi-stage build allows us to optimize for different use cases. The builder stage compiles TypeScript to JavaScript, the test stage provides a complete environment for running tests, and the production stage creates a minimal image with only the necessary dependencies. This approach reduces the final image size, improves security by minimizing the attack surface, and separates build-time dependencies from runtime dependencies.

2. **Q: What challenges did you face with Docker and how did you overcome them?**
   - A: One significant challenge was MongoDB compatibility with Alpine Linux in the test environment. MongoDB Memory Server required a specific version (7.0.3+) that wasn't compatible with Alpine. We resolved this by using a Debian-based Node.js image (node:18.19-bullseye) for the test stage while keeping Alpine for the production stage where MongoDB Memory Server isn't needed.

3. **Q: How does your Docker configuration support the CI/CD pipeline?**
   - A: Our Docker configuration is designed to work seamlessly with the CI/CD pipeline. The multi-stage build allows the pipeline to target specific stages (test or production) depending on the workflow. The test stage includes all dependencies needed for testing, while the production stage is optimized for deployment. This ensures consistent environments across development, testing, and production.

4. **Q: How do you manage environment variables in your Docker containers?**
   - A: We use a .env.example file as a template that's copied into the container as .env during the build process. For local development and testing, Docker Compose passes environment variables to the containers. In the CI/CD pipeline, GitHub Actions sets the necessary environment variables for each stage.

## Testing Questions

1. **Q: How do you ensure isolated test environments for your database tests?**
   - A: We use MongoDB Memory Server to create an in-memory MongoDB instance for each test run. This approach ensures that tests don't interfere with each other or with any external database. Our dbHandler.ts utility provides methods to connect to the in-memory database, clear it between tests, and close connections after testing.

2. **Q: Why did you set different coverage thresholds for development and production?**
   - A: The 60% threshold for development allows for rapid iteration and integration while still maintaining a reasonable level of test coverage. The 85% threshold for production ensures that code deployed to users has been thoroughly tested. This dual approach balances development speed with code quality.

3. **Q: How do you handle test failures in your CI/CD pipeline?**
   - A: Test failures automatically stop the pipeline, preventing deployment of broken code. We've configured Jest to fail if tests don't pass or if coverage thresholds aren't met. The pipeline also includes detailed error reporting to help quickly identify and fix issues.

4. **Q: What strategies did you use to improve test coverage?**
   - A: We focused on comprehensive model testing, ensuring that validation logic and error handling are thoroughly tested. We also excluded test helpers from coverage calculations to get a more accurate representation of application code coverage. The Jest configuration was updated to ignore directories that shouldn't be included in coverage reports.

## Architecture Questions

1. **Q: Why did you choose TypeScript for this project?**
   - A: TypeScript adds static typing to JavaScript, which helps catch errors during development rather than at runtime. It improves code quality, provides better IDE support with autocompletion and type checking, and makes the codebase more maintainable, especially as it grows.

2. **Q: How does your project structure support scalability and maintainability?**
   - A: The project follows the MVC pattern, separating concerns into models, controllers, and routes. This modular structure makes it easier to add new features, modify existing ones, and test components in isolation. The clear separation also improves code readability and maintainability.

3. **Q: How would you extend this API to include additional entities or functionality?**
   - A: Adding a new entity would involve creating a new model in the models directory, implementing controller logic in the controllers directory, and defining routes in the routes directory. This consistent pattern makes it straightforward to extend the API while maintaining the existing architecture.

4. **Q: What security considerations did you address in your API design?**
   - A: The API includes input validation at the model level to prevent invalid data. The Docker production image is minimal, reducing the attack surface. Environment variables are used for sensitive configuration. In a real-world scenario, we would also implement authentication, authorization, rate limiting, and HTTPS.

## General Implementation Questions

1. **Q: What was the most challenging aspect of implementing the CI/CD pipeline?**
   - A: One of the most challenging aspects was configuring the GitHub Actions workflows to properly handle Docker image building and pushing to the GitHub Container Registry. We had to address permission issues and ensure that repository names were properly formatted (lowercase) to comply with Docker's naming conventions.

2. **Q: How did you approach version control and release management?**
   - A: We followed semantic versioning (MAJOR.MINOR.PATCH) and maintained a detailed CHANGELOG.md to document all changes. Git tags were used to trigger the CD pipeline for new releases. This approach provides clear versioning for both the codebase and Docker images.

3. **Q: How would you improve this project for a production environment?**
   - A: For production, I would add authentication and authorization, implement comprehensive error handling and logging, set up monitoring and alerting, add more extensive documentation, and implement a more sophisticated database migration strategy.

4. **Q: How does your implementation meet the requirements of the assignment?**
   - A: The project implements a RESTful API with three entities (Users, Bikes, Cars) and MongoDB integration. It includes two separate CI/CD pipelines with test validation that stops the pipeline if tests fail. The test coverage thresholds are set to 60% for the test pipeline and 85% for the production pipeline. Docker is integrated into both the development workflow and the CI/CD pipelines. 

docker-compose up 
# DevOps API

A TypeScript-based REST API for managing users, bikes, and cars with full CI/CD pipeline integration and Docker support.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)
- Docker and Docker Compose
- Git

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devops_api
```

## Development

To run the application in development mode:

```bash
npm run dev
```

### Testing

Run tests with coverage:
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

## Docker Support

The application includes multi-stage Docker builds for different environments:
- Builder stage: Compiles TypeScript code
- Test stage: Runs tests with full dependencies
- Production stage: Minimal image with only production dependencies

### Running with Docker Compose

1. Test Environment:
```bash
# Build and run tests
docker-compose build test
docker-compose run test
```

2. Production Environment:
```bash
# Build and run the API
docker-compose up api
```

3. Stop all services:
```bash
docker-compose down
```

### Manual Docker Commands

Build the production image:
```bash
docker build -t devops-api --target production .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env devops-api
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### CI Pipeline (on push to main and pull requests)
- Runs tests in Docker environment
- Validates test coverage (minimum 60%)
- Builds Docker image
- Pushes to GitHub Container Registry

### CD Pipeline (on version tags)
- Runs tests with stricter coverage (minimum 85%)
- Builds production Docker image
- Pushes to GitHub Container Registry with version tag
- Updates latest tag

### Version Control
To create a new release:
1. Update version in package.json
2. Update CHANGELOG.md
3. Create and push a new tag:
```bash
git tag v1.x.x
git push origin v1.x.x
```

## Project Structure

```
.
├── src/
│   ├── __tests__/        # Test files
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── app.ts           # Main application file
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Docker services configuration
├── jest.config.js      # Jest testing configuration
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user (full update)
- `PATCH /api/users/:id` - Update a user (partial update)
- `DELETE /api/users/:id` - Delete a user

### Bikes

- `POST /api/bikes` - Create a new bike
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get a specific bike
- `PUT /api/bikes/:id` - Update a bike (full update)
- `PATCH /api/bikes/:id` - Update a bike (partial update)
- `DELETE /api/bikes/:id` - Delete a bike

### Cars

- `POST /api/cars` - Create a new car
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get a specific car
- `PUT /api/cars/:id` - Update a car (full update)
- `PATCH /api/cars/:id` - Update a car (partial update)
- `DELETE /api/cars/:id` - Delete a car

## Request Body Examples

### User
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Bike
```json
{
  "name": "Mountain Bike",
  "model": "Trek X-Caliber 8"
}
```

### Car
```json
{
  "name": "Sedan",
  "model": "Toyota Camry"
}
``` 
=======
# devops_api
>>>>>>> f63f17fb1ba271fdbd4394070461e0ec8f629384

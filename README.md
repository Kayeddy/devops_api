# DevOps API

A TypeScript-based REST API for managing users, bikes, and cars with full CI/CD pipeline integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)
- Docker (for containerized deployment)

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

## Production

To build and run the application in production:

```bash
npm run build
npm start
```

### Docker

Build the Docker image:
```bash
docker build -t devops-api .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env devops-api
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### CI Pipeline
- Triggers on push to main and pull requests
- Runs tests with 60% coverage threshold
- Builds Docker image
- Pushes to GitHub Container Registry

### CD Pipeline
- Triggers on version tags (v*)
- Runs tests with 85% coverage threshold
- Builds and pushes Docker image with version tag
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
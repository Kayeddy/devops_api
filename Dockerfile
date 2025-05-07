# Multi-stage Dockerfile for DevOps API
# This Dockerfile uses a multi-stage build approach to optimize the final image size and security.
# It includes three distinct stages, each with a specific purpose:
# 1. Builder - Compiles TypeScript to JavaScript
# 2. Test - Runs tests with full dependencies
# 3. Production - Minimal image with only production dependencies

#######################
# STAGE 1: BUILDER
#######################
# Uses Alpine Linux for a smaller base image size
# Alpine is a lightweight Linux distribution that results in smaller Docker images
FROM node:18-alpine AS builder

# Set the working directory inside the container
# All subsequent commands will run in this directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This step is separated from copying the source code to avoid reinstalling
# dependencies when only the source code changes
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including devDependencies)
# This is needed for the TypeScript compilation process
RUN npm install

# Copy the entire project to the container
# The '.' represents the build context (project root)
COPY . .

# Compile TypeScript code to JavaScript
# The output will be in the /app/dist directory as configured in tsconfig.json
RUN npm run build

#######################
# STAGE 2: TEST
#######################
# Uses Debian Bullseye (node:18.19-bullseye) instead of Alpine
# This is specifically chosen for MongoDB compatibility (version 7.0.3+)
FROM node:18.19-bullseye AS test

WORKDIR /app

# Copy configuration files needed for testing
# These files are copied first to leverage Docker cache
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./

# Install all dependencies with verbose output for better debugging
# The --verbose flag shows detailed information during the installation process
RUN npm install --verbose

# Copy only the source code and tests
# We don't need the rest of the project files for testing
COPY src/ ./src/

# Default command to run when the container starts
# This will execute the test script defined in package.json
CMD ["npm", "test"]

#######################
# STAGE 3: PRODUCTION
#######################
# Returns to Alpine for the production image to minimize size
# Production doesn't need MongoDB Memory Server compatibility
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install only production dependencies
# npm ci is faster and more reliable than npm install for CI environments
# --only=production flag excludes devDependencies to reduce image size
RUN npm ci --only=production

# Copy compiled JavaScript from the builder stage
# This is more efficient than including the source TypeScript files
# and avoids including development files in the production image
COPY --from=builder /app/dist ./dist

# Copy the example environment file and rename it to .env
# This provides default configuration for the application
COPY .env.example ./.env

# The container listens on port 3000
EXPOSE 3000

# Command to start the application
# Uses the start script defined in package.json
CMD ["npm", "start"] 
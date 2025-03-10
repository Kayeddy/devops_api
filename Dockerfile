# Multi-stage Dockerfile for DevOps API
# This Dockerfile includes three stages:
# 1. Builder - Compiles TypeScript to JavaScript
# 2. Test - Runs tests with full dependencies
# 3. Production - Minimal image with only production dependencies

# Build stage - Compiles TypeScript code
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Test stage - Runs tests with coverage
FROM node:18-alpine AS test

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./

# Install all dependencies including devDependencies
RUN npm install

# Copy source code and tests
COPY src/ ./src/

# Run tests by default with coverage
CMD ["npm", "test"]

# Production stage - Minimal image for running the application
FROM node:18-alpine AS production

WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled JavaScript from builder
COPY --from=builder /app/dist ./dist

# Copy and rename environment file
COPY .env.example ./.env

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 
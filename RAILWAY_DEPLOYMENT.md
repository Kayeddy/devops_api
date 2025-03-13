# Railway Deployment Guide

This document explains how the DevOps API is deployed to Railway using GitHub integration.

## Deployment Architecture

The DevOps API uses a streamlined deployment approach:

1. **GitHub Actions** handles testing and building Docker images
2. **GitHub Container Registry** stores the Docker images
3. **Railway** automatically deploys from the GitHub repository

## How It Works

### GitHub Actions Workflow

Our consolidated GitHub Actions workflow (`consolidated.yml`) handles:

- Running tests for all code changes
- Building Docker images for the application
- Pushing images to GitHub Container Registry
- Applying stricter test coverage thresholds for version tags

### Railway Integration

Railway is configured to:

- Monitor the GitHub repository for changes
- Automatically deploy when changes are detected
- Use the appropriate environment variables
- Provide health monitoring and logging

## Important Notes

1. **No Railway CLI**: We do not use the Railway CLI in our workflows. Railway's GitHub integration handles deployments automatically.

2. **Automatic Deployments**: Railway automatically deploys:
   - When changes are pushed to the `main` branch
   - When new version tags (v*) are created

3. **Environment Variables**: All necessary environment variables are configured in the Railway dashboard, not in the codebase.

## Troubleshooting

If you encounter deployment issues:

1. **Check GitHub Actions**: Ensure the consolidated workflow is running successfully
2. **Verify Railway Dashboard**: Check for deployment errors in the Railway dashboard
3. **Check Application Logs**: Review logs in the Railway dashboard for runtime errors
4. **Health Endpoint**: The `/api/health` endpoint can be used to verify the application is running

## Manual Deployment (Not Recommended)

While not recommended, you can manually deploy to Railway if needed:

1. Install the Railway CLI: `npm install -g @railway/cli`
2. Login to Railway: `railway login`
3. Link to your project: `railway link`
4. Deploy manually: `railway up`

However, this approach is discouraged as it bypasses the automated CI/CD pipeline. 
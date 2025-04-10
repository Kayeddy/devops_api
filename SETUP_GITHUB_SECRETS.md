# Setting Up GitHub Secrets for Alibaba Cloud Deployment

This guide provides step-by-step instructions for setting up the required GitHub secrets for deploying to Alibaba Cloud.

## Required Secrets

Add the following secrets to your GitHub repository:

1. **ALIBABA_ACCESS_KEY_ID**
   - Value: `<Your Alibaba Cloud Access Key ID>`
   - Description: Access Key ID for authenticating with Alibaba Cloud services

2. **ALIBABA_ACCESS_KEY_SECRET**
   - Value: `<Your Alibaba Cloud Access Key Secret>`
   - Description: Access Key Secret for authenticating with Alibaba Cloud services

3. **ALIBABA_NAMESPACE**
   - Value: `devops-api`
   - Description: Your Container Registry namespace, extracted from the repository endpoint

4. **MONGODB_URI**
   - Value: `<Your MongoDB Atlas connection string>`
   - Description: MongoDB Atlas connection string for your application

## How to Add Secrets in GitHub

1. Navigate to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" > "Actions"
4. Click on "New repository secret"
5. Enter the name and value for each secret listed above
6. Click "Add secret"

## Additional Information

- The container registry information that will be used:
  - Registry: `crpi-c6gh78lizb5lmr1d.us-west-1.personal.cr.aliyuncs.com`
  - Repository: `devops-api/alibaba-devops-api-deliverable`

- For testing locally with Docker, these credentials are also available in the `.env` file in the project root.

## Next Steps

Once you've added these secrets, you can trigger a deployment by:

1. Pushing to the `main` branch
2. Creating a new version tag (e.g., `v1.0.0`)

The GitHub Actions workflow will use these secrets to authenticate with Alibaba Cloud, build and push the Docker image, and deploy to your Kubernetes cluster. 
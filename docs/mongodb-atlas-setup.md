# Setting Up MongoDB Atlas for Railway Deployment

This guide will help you set up a free MongoDB Atlas cluster to use with your Railway-deployed DevOps API.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account or log in if you already have one

## Step 2: Create a Free Tier Cluster

1. Click "Build a Database"
2. Select "FREE" tier
3. Choose a cloud provider (AWS, Google Cloud, or Azure) and a region closest to your users
4. Click "Create Cluster" (this may take a few minutes to provision)

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access" under Security
2. Click "Add New Database User"
3. Create a username and password (use a strong password and save it securely)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access" under Security
2. Click "Add IP Address"
3. For Railway deployment, select "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production environments, you should restrict this to specific IP ranges
4. Click "Confirm"

## Step 5: Get Your Connection String

1. In the left sidebar, click "Database" under Deployments
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string, which will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your database user's username
6. Replace `<password>` with your database user's password
7. **IMPORTANT**: Add your database name after the hostname and before the query parameters:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/devops_api?retryWrites=true&w=majority
   ```
   - The database name (`devops_api` in this example) must be added between the hostname and the question mark
   - Without the database name, your application will fail to connect properly

## Step 6: Add the Connection String to Railway

1. Go to your project in the Railway dashboard
2. Click on the "Variables" tab
3. Add a new variable:
   - Key: `MONGODB_URI`
   - Value: Your complete MongoDB Atlas connection string (from Step 5, including the database name)

## Step 7: Test the Connection

1. Deploy your application on Railway
2. Check the logs to ensure the connection is successful
3. You should see "MongoDB connected successfully, API is fully operational" in the logs
4. If you see "MongoDB connection error" or "API is running in limited mode without database connection", check your connection string format

## Troubleshooting

If you encounter connection issues:

1. **Check Connection String Format**: Ensure your connection string includes the database name before the query parameters
   - Correct: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devops_api?retryWrites=true&w=majority`
   - Incorrect: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority` (missing database name)

2. Verify your username and password are correct (no special characters that need URL encoding)
3. Check that your IP whitelist includes 0.0.0.0/0
4. Ensure your database user has the correct permissions
5. Check Railway logs for specific error messages

## Security Considerations

For production environments:

1. Use environment-specific database users with minimal required permissions
2. Restrict IP access to only necessary ranges when possible
3. Enable MongoDB Atlas Advanced Security features if available
4. Regularly rotate database credentials
5. Never commit connection strings with credentials to your repository 
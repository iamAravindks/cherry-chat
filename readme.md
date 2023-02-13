# Setting up the Cherry-Chat Development Environment

## Prerequisites
- Node.js must be installed on the system
- `.env.example` file with the following variables:
  1. MONGODB_URL
  2. JWT_SECRET 
  3. AUTH_COOKIE 
  4. CLIENT_CONNECTION

## Option 1: Instant Dev Set Up
Run the following command in a bash shell (or you can use git bash shell) for an instant dev set up:

`./run.sh`

follow these commands to set the dev env


## Option 2: Setting Up the Dev Environment Manually
1. Create a `.env` file and set the variables, matching the values in `.env.example`
2. Run the following command to install dependencies: `npm install`
3. Go to the frontend directory and install its dependencies: `cd frontend && npm install`
4. Back to root by `cd ..`, Start the dev environment : `npm run serve` 





## Note
To set the MONGODB_URL variable, you can either use your local MongoDB installation or use the following demo database URL:

`mongodb+srv://demouser:cherry-chat@cluster0.jwil72k.mongodb.net/?retryWrites=true&w=majority`

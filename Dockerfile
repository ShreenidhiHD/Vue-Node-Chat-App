# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make the application's port available to the outside world
EXPOSE 80

# Define the command to run the application
CMD [ "npm", "start" ]
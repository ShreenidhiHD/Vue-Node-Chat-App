# Use Node.js version 18 as the base image
FROM node:18

# Set the working directory in the Docker container
WORKDIR /app

# Copy server package.json and package-lock.json
COPY server/package*.json ./server/

# Install server dependencies
RUN cd server && npm install

# Copy client package.json and package-lock.json
COPY client/package*.json ./client/

# Install client dependencies
RUN cd client && npm install

# Copy the rest of your server application source code to the container
COPY server/ ./server/

# Copy the rest of your client application source code to the container
COPY client/ ./client/

# Build the client application
RUN cd client && npm run build

# Expose port 80 (ensure your server application listens on this port)
EXPOSE 80

# Define the command to start your server application
# Adjust the path as necessary if your start command is different
CMD ["node", "server/app.js"]

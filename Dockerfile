# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Expose the port
EXPOSE 3001

# Command to start the server
CMD ["npm", "start"]

# Use Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Expose the port React app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "start"]

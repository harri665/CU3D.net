# Dockerfile for Express Server
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies with legacy-peer-deps
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server using the production start command
CMD ["npm", "run", "start:server"]

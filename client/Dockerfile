# Dockerfile for React Client
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies with legacy-peer-deps
COPY client/package.json client/package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code and build the React app
COPY client ./
RUN npm run build

# Use an Nginx image to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


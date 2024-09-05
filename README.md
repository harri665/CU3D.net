# BUID 
``` 
# Build backend image
docker build -t harri665/mern-backend .

# Build frontend image
docker build -t harri665/mern-frontend ./client

# Push backend image to Docker Hub
docker push harri665/mern-backend

# Push frontend image to Docker Hub
docker push harri665/mern-frontend
```
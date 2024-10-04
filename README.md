# BUID 
# IMPORTANT 
## Make sure to change the proxy in ./client/package.json from 
```
"proxy": "http://localhost:3001",
```
to 
```
"proxy": "http://backend:3001",
```

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


# Main deploys to live server upon push/merge
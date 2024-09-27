# BUID 
#IMPORTANT 

** Make sure to change the proxy in ./client/package.json from **
``
"proxy": "http://localhost:3001",
``
to 
``
"proxy": "http://backend:3001",
``

### this script will build the docker image and post it to docker hub
> this will update the server too ... 
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


# What youll need 
1. MongoDB Compass 
2. node + npm 
3. docker desktop 

# how to run 
``` npm run start:server ``` this will start the backend server

``` npm run start:client``` this will start just the front end client 

``` npm run start:dev:watch ``` this will start both the backend and the front end ** MAIN one your gonna use ** 

# Folder Structure 
``` bash
.client-configs #react configs 
.github # Workflow files for push to main 
client # React Instance 
controllers # mongo db config 
routes # express routes 
Scripts # default data 
utils # Discord Bot + other servers 
server.js # MAIN server file 

``` 
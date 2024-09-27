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




## Project Structure

```plaintext
CU3DWEBSITE/
├── .client-configs/
├── .github/
├── client/
├── controllers/
├── routes/
├── Scripts/
├── utils/
└── server.js
```

### Folder Use Cases

- **.client-configs/**: Contains configuration files for the React client.
- **.github/**: Holds GitHub workflow files for CI/CD processes, such as pushing to the main branch.
- **client/**: The main directory for the React application, including all frontend code.
- **controllers/**: Manages MongoDB configurations and interactions.
- **routes/**: Defines Express routes for handling API requests.
- **Scripts/**: Contains scripts for initializing default data.
- **utils/**: Includes utility scripts, such as the Discord bot and other server-related scripts.
- **server.js**: The main server file that initializes and runs the backend server.


## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/CU3DWEBSITE.git
    cd CU3DWEBSITE
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    cd client
    npm install
    cd ..
    ```

### Running the Application

1. Start the backend server:
    ```sh
    npm run start:server
    ```

2. Start the frontend client:
    ```sh
    npm run start:client
    ```

3. Start both backend and frontend in development mode:
    ```sh
    npm run start:dev:watch
    ```

### Running with Docker

1. Build and run the Docker containers:
    ```sh
    docker-compose up --build
    ```

2. Access the application:
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:3001`



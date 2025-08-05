# CU3D Portainer Deployment Guide

This guide explains how to deploy the CU3D application using Portainer's Git repository deploy feature.

## Prerequisites

- Portainer installed and running
- Docker environment
- Access to this Git repository
- Domain names configured (for production)

## Quick Deployment Steps

### 1. Access Portainer

1. Open your Portainer dashboard
2. Navigate to **Stacks** in the left sidebar
3. Click **Add stack**

### 2. Configure Git Repository

1. **Name**: Enter `cu3d-app` (or your preferred stack name)
2. **Repository URL**: `https://github.com/harri665/CU3D.net`
3. **Repository reference**: `refs/heads/main`
4. **Compose path**: `docker-compose.yml`
5. **Environment variables file**: `.env`

### 3. Environment Configuration

Either use the included `.env` file or configure these environment variables in Portainer:

#### Required Variables:
```bash
NODE_ENV=production
MONGO_USERNAME=root
MONGO_PASSWORD=your_secure_password_here
MONGO_DATABASE=mst
```

#### Optional Variables:
```bash
FRONTEND_PORT=3000
BACKEND_PORT=3001
FRONTEND_DOMAIN=your-domain.com
BACKEND_DOMAIN=api.your-domain.com
DISCORD_TOKEN=your_discord_token
DISCORD_GUILD_ID=your_guild_id
DISCORD_CHANNEL_ID=your_channel_id
```

### 4. Advanced Configuration

#### Enable Auto-Update
- Check **Automatic updates** to auto-deploy on git push
- Set **Fetch interval** to your preferred frequency (e.g., 5 minutes)

#### Access Control
- Configure appropriate access control if needed
- Set up user permissions for the stack

### 5. Deploy

1. Click **Deploy the stack**
2. Wait for all services to start (may take 2-3 minutes)
3. Check service health in the stack details

## Service Architecture

The deployment includes:

### Frontend Service (`cu3d-frontend`)
- **Port**: 3000
- **Image**: `harri665/mern-frontend:latest`
- **Health**: Monitored via container status
- **Dependencies**: Backend service

### Backend Service (`cu3d-backend`)
- **Port**: 3001
- **Image**: `harri665/mern-backend:latest`
- **Health**: HTTP endpoint `/api/health`
- **Dependencies**: MongoDB service

### MongoDB Service (`cu3d-mongodb`)
- **Port**: 27017
- **Image**: `mongo:4.4`
- **Health**: MongoDB ping command
- **Persistence**: Named volumes for data

## Data Persistence

- **mongodb_data**: Database files
- **mongodb_config**: MongoDB configuration

Data persists across container restarts and stack updates.

## Networking

- **Internal Network**: `cu3d-network`
- **External Access**: 
  - Frontend: Port 3000
  - Backend API: Port 3001
  - MongoDB: Port 27017 (if needed)

## Health Monitoring

### Built-in Health Checks

1. **Backend**: HTTP GET `/api/health`
   - Checks server uptime, database connection
   - Returns JSON with health status

2. **MongoDB**: MongoDB ping command
   - Verifies database responsiveness

### Manual Health Check

Access health endpoint: `http://your-server:3001/api/health`

Expected response:
```json
{
  "uptime": 123.456,
  "message": "CU3D Backend is healthy",
  "timestamp": 1625097600000,
  "environment": "production",
  "database": "connected"
}
```

## Troubleshooting

### Common Issues

1. **Services won't start**
   - Check environment variables
   - Verify Docker images are accessible
   - Check Portainer logs

2. **Database connection errors**
   - Verify MongoDB credentials
   - Check if MongoDB service is healthy
   - Review network connectivity

3. **Frontend can't reach backend**
   - Verify backend service is running
   - Check port configurations
   - Review proxy settings

### Logs Access

In Portainer:
1. Go to **Stacks** → **cu3d-app**
2. Click on individual services
3. View **Logs** tab for each service

### Service Restart

To restart specific services:
1. Navigate to the stack
2. Click on service name
3. Use **Restart** button

## Production Considerations

### Security
- Change default MongoDB passwords
- Use strong authentication credentials
- Configure HTTPS/SSL certificates
- Set up firewall rules

### Performance
- Monitor resource usage
- Scale services if needed
- Configure load balancing for high traffic

### Backup
- Regular MongoDB backups
- Version control for configuration
- Document custom environment variables

## Domain Configuration

For production with custom domains:

1. **Update Environment Variables**:
   ```bash
   FRONTEND_DOMAIN=yourdomain.com
   BACKEND_DOMAIN=api.yourdomain.com
   ```

2. **Configure Reverse Proxy**:
   - Use Traefik labels (included in docker-compose.yml)
   - Or configure external reverse proxy

3. **SSL Certificates**:
   - Use Let's Encrypt with Traefik
   - Or configure external SSL termination

## Support

For deployment issues:
1. Check service logs in Portainer
2. Verify environment configuration
3. Review this documentation
4. Check GitHub repository issues

## Version Updates

The stack automatically pulls the latest images:
- `harri665/mern-frontend:latest`
- `harri665/mern-backend:latest`

To update:
1. Push changes to Git repository
2. Portainer auto-updates (if enabled)
3. Or manually redeploy the stack

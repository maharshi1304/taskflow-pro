# Stage 1: Build the React/Vite app
# -----------------------------------
FROM node:22-alpine AS build

# Container ke andar working directory
WORKDIR /app

# Dependency files pehle copy karte hain
# taaki Docker cache better use ho
COPY package.json package-lock.json ./

# Exact locked dependencies install hongi
RUN npm ci

# Baaki complete project files copy karo
COPY . .

# Vite API URL build time par milega
ARG VITE_API_BASE_URL=http://host.docker.internal:5001

# Vite build ko environment variable dena
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Production files dist folder me generate hongi
RUN npm run build

# Stage 2: Serve build using Nginx
# -----------------------------------
FROM nginx:1.27-alpine AS production

# Default Nginx configuration replace karo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build stage se sirf production dist copy karo
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx port
EXPOSE 80

# Container start hone par Nginx run hoga
CMD ["nginx", "-g", "daemon off;"]

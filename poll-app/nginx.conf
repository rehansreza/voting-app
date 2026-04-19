# ---------------------------------------------------------
# Stage 1: Build Angular App
# ---------------------------------------------------------
FROM node:22 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular for production
RUN npm run build

# ---------------------------------------------------------
# Stage 2: Serve with NGINX
# ---------------------------------------------------------
FROM nginx:alpine

# Copy built Angular files to NGINX
COPY --from=build /app/dist/poll-app/browser/ /usr/share/nginx/html


# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

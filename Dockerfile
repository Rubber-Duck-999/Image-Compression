FROM jitesoft/node-yarn:16 as builder
# Set the working directory to /app inside the container
WORKDIR /app
ARG BUILD_ENV
# Copy app files
COPY package*.json ./
COPY . ./
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn
# Build the app
RUN yarn build:${BUILD_ENV}

# Bundle static assets with nginx
FROM nginx:stable-alpine
#Set working folder
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
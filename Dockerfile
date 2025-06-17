
# Use Node.js as the base image
FROM node:19 AS build
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install
 
# Copy the rest of the application files
COPY . .
 
# Build the Angular app
#RUN npm run build --prod
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build --prod
 
# Use Nginx to serve the built app
FROM nginx:alpine
#COPY --from=build /app/dist/fitness-tracker /usr/share/nginx/html
COPY --from=build app/dist/stock-app/browser /usr/share/nginx/html
 
 
# Expose port 80
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
 

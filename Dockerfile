# Use an official Node.js image as a base
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install necessary npm packages
RUN npm install

# Copy all the source files from the host to the container
COPY . .

# Expose the application port (optional: if your app uses a specific port)
EXPOSE 3002

# Command to run the Node.js app
CMD ["node", "index.js"]

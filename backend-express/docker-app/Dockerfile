# Use the official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (optional but nice)
EXPOSE 3002

# Start the app
CMD ["npm", "start"]
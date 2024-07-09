FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose port and start application
EXPOSE 3334
CMD ["npm", "run", "dev"]
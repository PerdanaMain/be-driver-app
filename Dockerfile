# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy project files
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
# Base image
FROM node:alpine

# Install necessary dependencies including openssl
RUN apk add --no-cache make gcc g++ python3 openssl openssl-dev


# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and rebuild bcrypt
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy project files
COPY . ./

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
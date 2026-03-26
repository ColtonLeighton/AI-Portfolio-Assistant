FROM node:22.20.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

EXPOSE 3000

# Use dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
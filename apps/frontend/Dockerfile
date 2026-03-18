# Build context: repo root (docker build -f frontend/Dockerfile .)
FROM node:20-alpine

WORKDIR /app

# Copy workspace and app package files first for better layer caching
COPY package.json package-lock.json nx.json tsconfig.json tsconfig.base.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
COPY backend-e2e/package.json backend-e2e/
COPY cms/package.json cms/

RUN npm install
RUN cd cms && npm install

COPY . .

EXPOSE 3000

# Dev server; listen on all interfaces for Docker
CMD ["npx", "nx", "serve", "frontend", "--hostname", "0.0.0.0"]

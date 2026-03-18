# Build context: repo root (docker build -f frontend/Dockerfile .)
FROM node:20-alpine

WORKDIR /app

# Copy workspace and app package files first for better layer caching
COPY package.json package-lock.json nx.json tsconfig.json tsconfig.base.json ./
COPY apps/frontend/package.json apps/frontend/
COPY apps/backend/package.json apps/backend/
COPY apps/backend-e2e/package.json apps/backend-e2e/
COPY apps/cms/package.json apps/cms/
COPY libs/backend/types/package.json libs/backend/types/

RUN npm install
RUN cd apps/cms && npm install

COPY . .

EXPOSE 3000

# Dev server; listen on all interfaces for Docker
CMD ["npx", "nx", "serve", "@epicure/frontend", "--hostname", "0.0.0.0"]

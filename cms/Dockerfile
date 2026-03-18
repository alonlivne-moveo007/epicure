# Build context: repo root (docker build -f cms/Dockerfile .)
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json nx.json tsconfig.json tsconfig.base.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
COPY backend-e2e/package.json backend-e2e/
COPY cms/package.json cms/

RUN npm install
RUN cd cms && npm install

COPY . .

EXPOSE 1337

# Strapi dev server; HOST=0.0.0.0 so it listens inside Docker
ENV HOST=0.0.0.0
CMD ["npx", "nx", "develop", "strapi"]

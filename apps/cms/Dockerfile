# Build context: repo root (docker build -f cms/Dockerfile .)
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json nx.json tsconfig.json tsconfig.base.json ./
COPY apps/frontend/package.json apps/frontend/
COPY apps/backend/package.json apps/backend/
COPY apps/backend-e2e/package.json apps/backend-e2e/
COPY apps/cms/package.json apps/cms/
COPY libs/backend/types/package.json libs/backend/types/

RUN npm install
RUN cd apps/cms && npm install

COPY . .

EXPOSE 1337

# Strapi dev server; HOST=0.0.0.0 so it listens inside Docker
ENV HOST=0.0.0.0
CMD ["npx", "nx", "develop", "cms"]

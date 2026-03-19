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

# Clean any leftover build/cache so admin builds from scratch (avoids "is not a function" / stale bundles).
RUN rm -rf apps/cms/build apps/cms/dist apps/cms/.cache apps/cms/.strapi/cache

# Build admin once in production mode. Avoids dev mode + Vite (localhost:5173) in Docker.
# --skip-nx-cache so the admin bundle is always built from source (avoids stale admin JS).
ENV NODE_ENV=production
RUN npx nx build cms --skip-nx-cache

EXPOSE 1337

# Production serve: admin is pre-built, no Vite/5173. HOST=0.0.0.0 for Docker.
ENV HOST=0.0.0.0
CMD ["npx", "nx", "start", "cms"]

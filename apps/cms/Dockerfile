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

# Build admin once (production build). Avoids dev mode + Vite (localhost:5173) in Docker.
RUN npx nx build cms

EXPOSE 1337

# Production serve: admin is pre-built, no Vite/5173. HOST=0.0.0.0 for Docker.
ENV HOST=0.0.0.0
ENV NODE_ENV=production
CMD ["npx", "nx", "start", "cms"]

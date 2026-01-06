# ================================
# 1️⃣ Dependencies layer (cached)
# ================================
FROM node:20-alpine AS deps
WORKDIR /app

# Copy ONLY dependency files to maximize cache
COPY package.json package-lock.json* ./

RUN npm install --frozen-lockfile


# ================================
# 2️⃣ Build layer
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time public env (Next.js)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Reuse cached deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source LAST (important for caching)
COPY . .

RUN npm run build


# ================================
# 3️⃣ Runtime layer (small & fast)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only what is needed at runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
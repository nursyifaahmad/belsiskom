# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl ca-certificates
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat openssl ca-certificates
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pastikan folder public selalu ada
RUN mkdir -p /app/public

# Gunakan engine prisma lokal agar build 100% offline dan bebas ECONNRESET
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/prisma/engines/libquery_engine-linux-musl-openssl-3.0.x.so.node
ENV PRISMA_SCHEMA_ENGINE_BINARY=/app/prisma/engines/schema-engine-linux-musl-openssl-3.0.x
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN chmod +x /app/prisma/engines/* || true
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat openssl ca-certificates
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/prisma/engines/libquery_engine-linux-musl-openssl-3.0.x.so.node
ENV PRISMA_SCHEMA_ENGINE_BINARY=/app/prisma/engines/schema-engine-linux-musl-openssl-3.0.x

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy prisma CLI, engines and scripts for entrypoint execution
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./package.json

# Copy standalone build Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Setup script entrypoint
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh && (chmod +x /app/prisma/engines/* 2>/dev/null || true) && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm install -f


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vitejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN npm install vite

# Set the correct permission for prerender cache
RUN mkdir dist
RUN chown vitejs:nodejs dist

USER vitejs

EXPOSE 3005

ENV PORT 3005

CMD ["npm", "run", "preview"]
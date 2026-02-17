# 1️⃣ Build stage

FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY


RUN npm run build
EXPOSE 3000


# 2️⃣ Run stage

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]




# Isko tod ke samjho:
# --from=builder

# 👉 builder factory se uthao

# /app/.next

# 👉 source (builder ke andar path)

# ye compiled Next.js app hai

# ./.next

# 👉 destination (current image ke andar)
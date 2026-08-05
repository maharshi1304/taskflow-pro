FROM node:22-alpine

WORKDIR /app

# Dependency files copy karo
COPY package.json package-lock.json ./

# Production dependencies install karo
RUN npm ci --omit=dev

# Application files copy karo
COPY server.js ./
COPY seed-db.json ./

# JSON Server v1 public folder scan karta hai.
# Data folder writable database ke liye hai.
RUN mkdir -p /app/public /app/data

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

CMD ["npm", "start"]
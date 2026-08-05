# FROM node:22-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci --omit=dev

# COPY . .

# ENV NODE_ENV=production

# EXPOSE 5001

# CMD ["npm", "start"]

FROM node:22-alpine

WORKDIR /app

# Dependencies install karne ke liye
COPY package.json package-lock.json ./

RUN npm ci --omit=dev

# API source and seed database copy karo
COPY server.js ./
COPY seed-db.json ./

# JSON Server v1 ko public folder chahiye
# data folder writable database ke liye hai
RUN mkdir -p /app/public /app/data


ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

CMD ["npm", "start"]
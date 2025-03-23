FROM node:23.9.0-slim AS builder
WORKDIR /my-space

COPY package.json ./
RUN npm i --force
COPY . .
RUN npm run build

FROM node:23.9.0-slim AS runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/next.config.ts ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next ./.next

EXPOSE 3000
RUN npm install --omit=dev
CMD ["node", "./node_modules/.bin/next", "start"]

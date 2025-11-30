FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM scratch
COPY --from=build /app/dist /dist
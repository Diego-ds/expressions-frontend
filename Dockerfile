FROM node:18.12.1-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn set version 1.22.19
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.23.3-alpine
COPY --from=builder ./app/build /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx","-g","daemon off;"]

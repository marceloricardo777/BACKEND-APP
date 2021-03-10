FROM node:15.5-alpine3.12 as builder
WORKDIR /app
COPY package.json ./
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn install
COPY . ./
RUN yarn build

FROM node:15.5-alpine3.12
WORKDIR /app
COPY --from=builder /app/build ./
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn install --prod

EXPOSE 3333
USER node
CMD ["node", "index.js"]
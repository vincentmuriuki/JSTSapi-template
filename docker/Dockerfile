FROM node:16-alpine

RUN apk --no-cache add \
    bash \
    openssl

RUN mkdir -p /app
RUN mkdir -p /app/build

COPY . /app/

WORKDIR /app

# COPY package*.json ./

RUN yarn

# Build
RUN yarn build

COPY . .

EXPOSE 3010
CMD ["yarn", "watch"]
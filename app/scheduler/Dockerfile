FROM node:18.14-alpine

WORKDIR /usr/app
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true 
RUN npm install -g pnpm
RUN npm install -g nodemon
COPY ./app/scheduler/package*.json ./
RUN pnpm install
COPY ./app/scheduler ./
EXPOSE 3000
CMD pnpm run dev
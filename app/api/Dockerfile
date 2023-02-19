FROM node:18

WORKDIR /usr/app
RUN npm install -g pnpm
RUN npm install -g nodemon
COPY ./app/api/package*.json ./
RUN pnpm install
COPY ./app/api ./
EXPOSE 3000
CMD pnpm run dev
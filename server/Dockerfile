FROM node:16

RUN mkdir -p /src

COPY package.json src/package.json

WORKDIR /src

RUN npm install

COPY . /src

CMD npm run dev
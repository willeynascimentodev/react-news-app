FROM node:15.4

COPY . /usr/src/

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "/bin/bash" ]
#!/bin/bash

rm -rf nginx/index.html nginx/public nginx/node_modules && \
(cd app-client && npm run build) && \
cp -r app-client/public ./nginx/ && \
cp app-client/index.html ./nginx
cp app-client/package.json ./nginx && \
(cd nginx && npm i --production) && \
docker-compose build && \
docker-compose up

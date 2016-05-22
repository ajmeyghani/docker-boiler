FROM nginx
MAINTAINER Anand Mani Sankar
# make app folder
RUN mkdir -p /usr/src/app

# add the static files from the node web app
COPY ./public /usr/src/app/public
COPY ./node_modules /usr/src/app/node_modules
COPY ./index.html /usr/src/app/public/index.html
# ADD . /usr/src/app

# copy config files.
COPY nginx.conf /etc/nginx/nginx.conf

# Pull Node base iamge
FROM node
MAINTAINER Amin Meyghani <meyghania@gmail.com>

# Update, install phantom
RUN apt-get -qq update
RUN apt-get -qq -y install git curl wget bzip2 libfontconfig
RUN npm i -g phantomjs

# Add the current working folder as a mapped folder at /usr/src/app
# ADD . /usr/src/app

# add profile
RUN touch ~/.bash_profile

# Set up latest local Node > 5 + nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
ENV NVM_DIR=/usr/src/app/.nvm
ENV NODE5=5
RUN . $HOME/.nvm/nvm.sh && nvm install $NODE5 && nvm alias default $NODE5 && nvm use default

# add nvm bin to path
ENV PATH $PATH:/usr/src/app/.nvm/versions/node/v5.6.0/bin

# install global packages
RUN npm i nodemon pm2 -g

# Set the current working directory to the new mapped folder.
ADD . /usr/src/app

WORKDIR /usr/src/app

# Install your application's dependencies
RUN npm install --production

# Print node version
RUN node --version

# Expose the node.js port to the Docker host.
# EXPOSE 8046

# This is the stock express binary to start the app.
# CMD PORT=8046 nodemon --legacy-watch main.js

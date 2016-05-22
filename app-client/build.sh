#!/bin/bash

rm -rf public/dist && \
NODE_ENV=production ./bin/webpack --devtool sourcemap && \
./bin/webpack -d && \
NODE_ENV=debug ./bin/webpack --debug --devtool eval --output-pathinfo

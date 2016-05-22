var express = require('express');
var path = require('path');
module.exports = function (app) {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

  app.all(/^\/(?!api).*/, function(req, res){
    res.sendFile('index.html', {root: path.join(__dirname) });
  });
};

var express = require('express');
var path = require('path');
var app = express();
var proxy = require('express-http-proxy');

if (!(process.env.NODE_ENV === 'production')) {
  require('./serve-static')(app);
}

var API_HOST =  (process.env.WEB_ENV === 'docker') ? 'http://apiservice:3032' : 'http://localhost:3032';

app.use('/api', proxy(API_HOST, {
  forwardPath: function(req, res) {
    var endpoint = '/api' + require('url').parse(req.url).path;
    return endpoint;
  }
}));

var port = process.env.PORT || 8089;
app.listen(port, function () {
  console.log('Server running at %s', port);
});


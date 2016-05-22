var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

require('./serve-static')(app);

router.get('/students', function(req, res) {
  res.json({
    hello: 'there2'
  });
});

router.get('/posts', function(req, res) {
  res.json(
    [
      { title: 'tom' },
      { title: 'milo' },
    ]
  );
});

app.use('/api', router);
var port = process.env.PORT || 8089;
app.listen(port, function() {
  console.log('Server running at %s', port);
});

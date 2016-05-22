var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var path = require('path');
var faker = require('faker');
var logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();
var router = express.Router();
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/mydb';
} else {
  MONGO_DB = process.env.MONGODB;
}

mongoose.connect(MONGO_DB);
console.log('Mongo path: ', MONGO_DB);

var userSchema = new mongoose.Schema({
  name: String
});
var UserModel = mongoose.model('User', userSchema);

// GET /api/posts
router.use('/posts', function (req, res) {
  var posts = [];
  var count = 5;
  while (count-- > 0) {
    posts.push({
      id: faker.random.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.sentences(),
    })
  }
  res.json(posts);
});

router.get('/students', function (req, res) {
  UserModel.find().then(function(err, items) {
    if (err) {
      console.log('It seems like the table doesnt exist?');
      return res.send(err);
    }
    res.json(items);
  });
});

router.post('/students', function (req, res) {
  var name = req.body.name;
  var newUser = new UserModel({name : name});
  newUser.save(function (err) {
    if (err) { return console.log('couldnt save to the db');}
    return res.json({
      message: 'User saved'
    });
  });
});

app.use('/api', router);

var port = process.env.PORT || 3032;
app.listen(port, function () {
  console.log('Server running at %s', port);
});


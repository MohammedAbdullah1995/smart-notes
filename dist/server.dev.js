"use strict";

var express = require("express");

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var dbConfig = require('./config/database.config.js');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Successfully connected to the database");
})["catch"](function (err) {
  console.log('Could not connect to the database. Exiting now ...', err);
  process.exit();
});
app.get('/', function (req, res) {
  res.json({
    "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
  });
});
app.options('*', cors());

require('./app/routes/note.routes.js')(app);

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
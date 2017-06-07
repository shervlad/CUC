var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cuc');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var Question = require(./models/question);
});

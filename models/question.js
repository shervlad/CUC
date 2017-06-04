var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  body : String,
  answer : String,
  comment : String,
  authors : [{name:String}],
  sources : [{url:String}]
});

module.exports = mongoose.model('Question', questionSchema);

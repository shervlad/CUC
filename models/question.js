var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  body : String,
  answer : String,
  comment : String,
  author : String
});

var Question = module.exports = mongoose.model('Question', questionSchema);

module.exports.getQuestionByAuthor = function(author, callback){
	var query = {author: author};
	Question.findOne(query, callback);
}

module.exports.getAllQuestions = function(callback){
	Question.find({},function(err,questions){
    for(var q in questions){
      console.log(q);
    }
    callback(questions);
  })
}

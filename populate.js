var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cuc');


var authors = [Vlad Seremet,Andrei Giletchi,Ion Prisacari,Anton Pirijoc,Adrian Ursu, Octav Siretean,
              Alexandru Fala, Ion Dodi, Alexandrin Zmeu,Catalin Gangalic]
function generateWord(){

}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var Question = require(./models/question);
});

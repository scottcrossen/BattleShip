var express = require('express');
//var fs = require('fs');
//var request = require('request');
//var EventEmitter = require('events').EventEmitter;
var router = express.Router();
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/connectFourDB'); 

var connectFourSchema = mongoose.Schema({ 
session: {type: String, required: true},
board: [],
turn: {type: Number, min: 0, max: 2, default: 2}, 
player1: String,
player2: String,
updated: {type: Date, default: Date.now}
});

var ConnectFour = mongoose.model('ConnectFour', connectFourSchema); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
console.log('Connected');
});

var jsonExample={
  board: [
           [0,1,0],
           [0],
           [1,0],
           [1],
           [1,1,1,0,0,0],
           [0,0,0,1,1,1],
           []
         ],
  turn: 0,
  player0: "Player name",
  player1: "Player name",
  session: "abcdefg"
};
validateRow=function(object){
  console.log("This needs to be addded");
  return object;
};
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});
router.post('/board',function(req,res,next) {
  console.log("Entering post route");
  //console.log("Request:",req.body);
  //var new_board = new ConnectFour(req.body);
  //console.log(new_board);
  //new_board.save(function(err, post) {
  //  if (err) return console.error(err);
  //  console.log(post);
  //  res.status(200).json(jsonExample);
  res.sendStatus(200);
  //});
});

router.get('/board',function(req,res,next) {
  ConnectFour.find(function(err,boardList) {
    if (err) return console.error(err);
    else {
      console.log(boardList);
      res.status(200).json(jsonExample);
    }
  })
});

module.exports = router;

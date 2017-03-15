var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ConnectFourDB');
var connectFourSchema = mongoose.Schema({ 
  session: {type: String, required: true},
  board: [],
  turn: {type: Number, min: 0, max: 2, default: 2}, 
  player0: {type: String, default: "Unknown"},
  player1: {type: String, default: "Unknown"},
  updated: {type: Date, default: Date.now}
});
var Board = mongoose.model('Board', connectFourSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connect Four' });
});

addcol=function(board, column, player){
  if(board[column].length<6)
    board[column].push(player);
  return board;
}

router.post('/board', function(req, res, next) {
  console.log("POST comment route");
  console.log(req.body);
  if(req.body.session == undefined || req.body.session == null) res.sendStatus(500);
  Board.findOne({'session': req.body.session}, function(error, foundsession) {
    if(foundsession && !error){
      var conditions = { session: req.body.session };
      if(req.body.move != undefined && req.body.move !=null && req.body.move.player != undefined && req.body.move.player != null && typeof(req.body.move.player) === 'number' && ((req.body.move.player === 0 && foundsession.turn===0) || (req.body.move.player === 1 && foundsession.turn===1)) && req.body.move.column != undefined && req.body.move.column != null && typeof(req.body.move.column) === 'number' && req.body.move.column>=0 && req.body.move.column<=7){
        console.log(foundsession.board);
        console.log(req.body.move.column);
        console.log(req.body.move.player);
        var update = { $set: { turn: ((req.body.move.player==0)? 1 : 0), board: addcol(foundsession.board, req.body.move.column, req.body.move.player)}};
      }
      else
        var update = { $set: req.body};
      var options = { multi: true };
      Board.update(conditions, update, options, function(err,num){});
      res.sendStatus(200);
    } else if(!foundsession) {
      var newboard = new Board(req.body); 
      console.log(newboard);
      newboard.save(function(err, post) {
      if (err) return console.error(err);
        console.log(post);
        Board.findOne({'session': newboard.session}, function(err,foundboard) {
          if (err) return console.error(err);
          else {
            console.log(foundboard);
            res.json(foundboard);
          }
        })
        res.sendStatus(200);
      });
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  });
});

router.get('/board',function(req, res, next) {
  console.log("In the GET route?");
  console.log(req.query);
  Board.findOne({'session': req.query.session}, function(err,foundboard) {
    if (err) return console.error(err);
    else {
      console.log(foundboard);
      res.json(foundboard);
    }
  })
});

module.exports = router;

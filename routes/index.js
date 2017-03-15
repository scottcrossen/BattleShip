var express = require('express');
var fs = require('fs');
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
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
}
router.get('/board',function(req,res,next) {
  res.status(200).json(jsonExample);
});
router.post('/board',function(req,res,next){
  res.status(200).json(jsonExample);
});

module.exports = router;

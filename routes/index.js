var express = require('express');
var fs = require('fs');
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});
router.get('/board',function(req,res,next) {
  var jsonresult=[];
  jsonresult.push({
    column1: [0,1,0],
    column2: [0],
    column3: [1,0],
    column4: [1],
    column5: [1,1,1,2,2,2],
    column6: [2,2,2,1,1,1]
    column7: [],
    turn: "Player name",
    session: "abcdefg"
  });
  res.status(200).json(jsonresult);
});

module.exports = router;

var board
var gameID
var name
var turn
var player


$(document).ready(function() {
  doModal()
})

function doModal() {
  $('#myModal').modal('show')
}

function closeModal(){
  setInterval(getBoard, 5000)
  runPage()
}

function modalSubmit() {
  name = $('#name').val()
  gameID = $('#gameID').val()

  if ($('#newGame').is(':checked')) {
    var data = {
      "session" : gameID,
      "player0" : name,
      "turn": 0,
      "board": [[],[],[],[],[],[],[]]
    }
    $.ajax({
      url: '/board',
      method: 'POST',
      contentType: "application/json;odata=verbose",
      data: JSON.stringify(data),
      headers: {
        "Accept": "application/json;odata=verbose"
      },
      success: function(res) {
        console.log("Game Created");
        console.log(res);
        $('#myModal').modal('toggle')
        player = 0
        closeModal();
      },
      failure: function() {
        console.log('Server error. Try again')
      }
    })
  }
  else {
    $.ajax({
      url: '/board?session=' + gameID,
      method: 'GET',
      headers: { "Accept": "application/json; odata=verbose" },
      success: function(json) {
        console.log("Finding board:");
        console.log(json);
        if(json==null || json==undefined){
          console.log("Board not found");
          $('#alert').html('<div class="alert alert-warning">Game ID does not exist. Please create a new game or try again.</div>');
        }
        else {
          var data = {
            "session" : gameID,
            "player1" : name
          }
          $.ajax({
            url: '/board',
            method: 'POST',
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(data),
            headers: {
              "Accept": "application/json;odata=verbose"
            },
            success: function(res) {
              console.log("Game joined");
              console.log(res)
              $('#myModal').modal('hide')
              player = 1
              closeModal();
            },
            failure: function() {
              console.log('Server error. Try again');
            }
          })
        }
      },
      failure: function(){
        console.log('server error. Try again');
      }
    })
  }
}

function getBoard() {
  $.ajax({
    url: '/board?session=' + gameID,
    method: 'GET',
    headers: { "Accept": "application/json; odata=verbose" },
    success: function(json) {
      console.log("Board Recieved");
      paintBoard(json)
    }
  })
}

function paintBoard(json) {
  console.log("Making Board");
  board = json.board
  turn = json.turn
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] == 0) {
        $('#' + (j+1).toString() + (i+1).toString() + ' .circle').css('background', 'red')
      }
      if (board[i][j] == 1) {
        $('#' + (j+1).toString() + (i+1).toString() + ' .circle').css('background', 'black')
      }
    }
  }
  $('#turn').text("Player "+((turn+1)==1? "One":"Two")+"'s Turn");
}

function runPage() {
  turn = 0

  $('.col1').click(function() {
    if (turn == player)
    {
      madeMove(0)
    }
  })
  $('.col2').click(function() {
    if (turn == player)
    {
      madeMove(1)
    }
  })
  $('.col3').click(function() {
    if (turn == player)
    {
      madeMove(2)
    }
  })
  $('.col4').click(function() {
    if (turn == player)
    {
      madeMove(3)
    }
  })
  $('.col5').click(function() {
    if (turn == player)
    {
      madeMove(4)
    }
  })
  $('.col6').click(function() {
    if (turn == player)
    {
      madeMove(5)
    }
  })
  $('.col7').click(function() {
    if (turn == player)
    {
      madeMove(6)
    }
  })
}

function madeMove(col) {
  var data = {
    "session" : gameID,
    "move" : {
      "player" : player,
      "column" : col
    }
  }
  $.ajax({
    url: '/board',
    method: 'POST',
    contentType: "application/json;odata=verbose",
    data: JSON.stringify(data),
    headers: {
      "Accept": "application/json;odata=verbose"
    },
    success: function() {
      getBoard()
    }
  })
}

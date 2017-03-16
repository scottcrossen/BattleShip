
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
  $('#myModal').on('hide.bs.modal', function() {
    setInterval(getBoard, 5000)
    runPage()
  })
}

function modalSubmit() {
  name = $('#name').val()
  gameID = $('#gameID').val()

  if ($('#newGame').is(':checked')) {
    var data = {
      "session" : gameID,
      "player0" : name,
      "turn": 0
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
        $('myModal').modal('toggle')
        player = 0
      },
      failure: function() {
        console.log('Server error. Try again')
      }
    })
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
      success: function() {
        console.log("ajax success");
        console.log("Game joined");
        $('myModal').modal('toggle')
        player = 1
      },
      failure: function() {
        $('#alert').html('<div class="alert alert-warning">Game ID does not exist. Please create a new game or try again.</div>')
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
      paintBoard(json)
    }
  })
}

function paintBoard(json) {
  board = json.board
  turn = json.turn
  for (var i = 1; i < board.length + 1; i++) {
    for (var j = 1; j < board[i].length + 1; j++) {
      if (board[i][j] == 0) {
        $('#' + i + j + ' .circle').css('background', 'red')
      }
      if (board[i][j] == 1) {
        $('#' + i + j + ' .circle').css('background', 'black')
      }
    }
  }

}

function runPage() {
  turn = 0

  $('.col1').click(function() {
    if (turn == player)
    {
      madeMove(1)
    }
  })
  $('.col2').click(function() {
    if (turn == player)
    {
      madeMove(2)
    }
  })
  $('.col3').click(function() {
    if (turn == player)
    {
      madeMove(3)
    }
  })
  $('.col4').click(function() {
    if (turn == player)
    {
      madeMove(4)
    }
  })
  $('.col5').click(function() {
    if (turn == player)
    {
      madeMove(5)
    }
  })
  $('.col6').click(function() {
    if (turn == player)
    {
      madeMove(6)
    }
  })
  $('.col7').click(function() {
    if (turn == player)
    {
      madeMove(7)
    }
  })
}

function madeMove(col) {
  var data = {
    "Session" : gameID,
    "Move" : {
      "Player" : player,
      "Column" : col
    }
  }
  $.ajax({
    url: '/board?session=' + gameID,
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

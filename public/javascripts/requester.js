$(document).ready(function(){
  $("#postButton").click(function(){
      var myobj = {session:$("#session").val(),move: {column:parseInt($("#column").val()), player:parseInt($("#player").val())}};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "board";
      $.ajax({
          url: url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
              $("#done").html(textStatus);
          }
      })
  });
  $("#getButton").click(function() {
    console.log('board?session='+$("#query").val());
    $.getJSON('board?session='+$("#query").val(), function(data) {
      console.log(data);
      if(data != undefined && data != null){
        var everything = "<ul>";
        if(data.session != undefined && data.session != null) everything+="<li> Session: "+data.session+"</li>";
        if(data.board.length>0) everything+="<li> Board: "+ data.board+"</li>";
        if(data.turn != undefined && data.turn != null) everything+="<li> Turn: "+data.turn+"</li>";
        if(data.player0 != undefined && data.player0 != null) everything+="<li> Player 1: "+data.player0+"</li>";
        if(data.player1 != undefined && data.player1 != null) everything+="<li> Player 2: "+data.player1+"</li>";
        if(data.updated != undefined && data.updated != null) everything+="<li> Updated: "+data.updated+"</li>";
        everything += "</ul>";
        $("#response").html(everything);
      }
      else $("#response").html("No Session");
    })
  })
});

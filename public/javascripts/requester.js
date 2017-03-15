$(document).ready(function(){
  $("#poster").click(function(){
      jobj = JSON.stringify($("#body").val());
      $("#json").text(jobj);
      var url = "board";
      $.ajax({
          url: url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
              $("#status").html(textStatus);
          }
      })
  });
  $("#getter").click(function() {
    $.getJSON('board', function(data) {
      console.log(data);
      $("#reponse").html(data);
    })
  })
});



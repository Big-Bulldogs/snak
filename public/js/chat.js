$(document).ready(function () {
  $.get("/api/user_data", function (data) {
    console.log(data.username);
    localStorage.setItem("username", data.username);
  });
  const username = localStorage.getItem("username");
  $.get("/api/rooms", function (data) {
    for (i = 0; i < data.length; i++) {
      console.log(data[i].room_name);
      $(".channel").append(`<a href='#' data-id='${data[i].room_name}' class='list-group-item list-group-item-action clearfix channelItem'> ${data[i].room_name} <button class="btn btn-default btn-xs pull-right remove-item"><span class="glyphicon glyphicon-remove"></span></button></a>`);
    }
    var socket = io();
    var global = "global channel"
    socket.on('connect', () => {
      
     socket.emit('room.join', global)
    })

    socket.on('room.joined', function(message){
      $(".chat-box").append($("<li>").text(`${message}`));
    })

    $(".channelItem").attr("id", function (i) {
      return "channelName" + (i + 1);
    });

    $('a[id^="channelName"]').on("click", function () {
     
      var id = $(this).data('id');
      console.log(id)
      socket.emit('room.leave', global).then(socket.emit('room.join', id))

      
    });


    $("#send").on("click", function (event) {
      event.preventDefault();
      socket.emit("message", $("#messagearea").val() + " // " + username);
      $("#messagearea").val("");
      return false;
    });
    socket.on("message", function (msg) {
      $(".chat-box").append($("<li>").text(msg));

      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
          // status is "granted", if accepted by user
          var n = new Notification("Message", {
            body: msg,
          });
        });
      }
    });
    $("#messagearea").on("keypress", function (e) {
      if (e.which == 13) {
        socket.emit("message", $("#messagearea").val() + " // " + username);
        $("#messagearea").val("");
        return false;
      }
    });



  });
  

  


  
  $("#welcomeUser").text("Welcome " + username);

  $.get("/api/user_info", function (data) {
    let acctCreated = data.createdAt;
    $("#acctCreated").text(
      "Snak Member Since: " + moment(acctCreated).format("ll")
    );
  });

  $("#changeUsername").on("click", function() {
    $('#changeUsernameModal').modal('show');
    $("#saveNewUsername").on("click", function() {
      let newUsername = $("#newUsername").val().trim();
      console.log('newUsername:', newUsername)
      $.ajax("/api/usernames", {
        method: "PUT",
        data: {newUsername: newUsername}
      }).then(function(data) {
        console.log(data);
        $("#welcomeUser").text("Welcome " + username);
      })
    })
  });

  

  
    // var socket = io();
    // $("#send").on("click", function (event) {
    //   event.preventDefault();
    //   socket.emit("message", $("#messagearea").val() + " // " + username);
    //   $("#messagearea").val("");
    //   return false;
    // });
    // socket.on("message", function (msg) {
    //   $(".chat-box").append($("<li>").text(msg));

    //   if (window.Notification && Notification.permission !== "denied") {
    //     Notification.requestPermission(function (status) {
    //       // status is "granted", if accepted by user
    //       var n = new Notification("Message", {
    //         body: msg,
    //       });
    //     });
    //   }
    // });
    // $("#messagearea").on("keypress", function (e) {
    //   if (e.which == 13) {
    //     socket.emit("message", $("#messagearea").val() + " // " + username);
    //     $("#messagearea").val("");
    //     return false;
    //   }
    // });

   


    $(".add_room_btn").click(function () {
      $.post("/api/rooms",{
          room_name: $(".add_room").val().trim(),
        },
        function (data) {
          console.log(data);
          window.location.reload();
        }
      );
      
    });
  });


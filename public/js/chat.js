$(document).ready(function () {
  $.get("/api/user_data", function (data) {
    console.log(data.username);
    localStorage.setItem("username", data.username);
  });
  
  const username = localStorage.getItem("username");
  
  $("#welcomeUser").text("Welcome " + username);
  
  
  $.get("/api/user_info", function (data) {
    let acctCreated = data.createdAt;
    $("#acctCreated").text("Snak Member Since: " + moment(acctCreated).format('ll'));

  });

  $("#changeUsername").on("click", function() {
    $('#changeUsernameModal').modal('show')
    // .then(

    // )
  });
  
  

  // Getting references to our form and inputs
  const searchButton = $("#searchUser");
  let searchedName = $("input#name-input");

  // When the search button is clicked, we validate there's a name entered
  searchButton.on("click", function (event) {
    event.preventDefault();
    var searchedData = {
      name: searchedName.val().trim(),
    };

    if (!searchedData.name) {
      return;
    }

    // If we have a name, we run the populateMatchedUsers function and clear the form
    populateMatchedUsers(searchedData.name);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function populateMatchedUsers(name) {
    //for each search result with that name, create an <ul> populating the list with <li> containing data from the database
  }

  $(function () {
    var socket = io();
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
    $("#add_chat_room").click(function (event) {
      console.log("testing");
    })

   
    // $(".list-group-item").on("click", function(event){
    //   $(this).addClass("active");
    // });
    
    
  //     //"socket.on("connection", function (client) {
  //       // client.on("new room", function (room) {
  //       //   console.log("joining room", room);
  //       //   client.join(room);
  //       // });


  //       // client.on("leave room", function (room) {
  //       //   console.log("leaving room", room);
  //       //   client.leave(room);
  //       // });

  //       // client.on("send", function (data) {
  //       //   console.log("sending message");
  //       //   //io.sockets.in(data.room).emit("message", data);
  //       // });
  //     });
  //   // });
  //   //var socket = io.connect();
  //   //socket.on("message", function (data) {
  //     //console.log(data);
  //   // });

  //   //socket.emit("subscribe", "roomOne");
  //   //socket.emit("subscribe", "roomTwo");

  //   // $("#send").click(function () {
  //   //   var room = $("#room").val(),
  //   //     message = $("#message").val();

  //   //   //socket.emit("send", { room: room, message: message });
  //   // });
  // //});
});

});

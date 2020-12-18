$(document).ready(function () {
  $.get("/api/user_data", function (data) {
    console.log(data.username);
    localStorage.setItem("username", data.username);
  });
  
  $.get("/api/rooms", function (data) {
    for(i=0; i < data.length; i++) {
      console.log(data[i].room_name);
      $('.channel').append(`<a href='#' data-id='${data[i].room_name}' class='list-group-item list-group-item-action channelItem'> ${data[i].room_name} </a>`)
    }
    $('.channelItem').attr('id', function(i) {
      return 'channelName'+(i+1);
    });
    
    $('a[id^="channelName"]').on('click', function (){
      $(".chat-box").append($("<li>").text(`You have now joined ${$(this).attr("data-id")}`));
    })
    
  });
  $.post("/api/rooms", function (data) {
    console.log(data.room_name);
  })

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
    $(".add_room_btn").click(function () {
      $.post("/api/rooms", {
        room_name: $(".add_room").val().trim()
      }, function(data){
        console.log(data)
      })
      window.location.reload();
    })

   

});

});

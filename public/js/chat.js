$(document).ready(function() {
    // Getting references to our form and inputs
    const searchButton = $("#searchUser");
    let searchedName = $("input#name-input");
  
    // When the search button is clicked, we validate there's a name entered
    searchButton.on("click", function(event) {
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

    $(function (){
      var socket = io();
      $('#send').on('click', function (event) {
         event.preventDefault();
         socket.emit('message', $('#messagearea').val());
         $('#messagearea').val('');
         return false;
      });
      socket.on('message', function(msg){
             $("#messages").append($('<li>').text(msg))
         })
         $('#messagearea').on('keypress',function(e) {
          if(e.which == 13) {
              socket.emit('message', $('#messagearea').val());
         $('#messagearea').val('');
         return false;
          }
      });
  });
  });
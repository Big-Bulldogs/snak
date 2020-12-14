$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("input#firstname-input");
  var lastNameInput = $("input#lastname-input");
  var usernameInput = $("input#username-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password || !userData.first_name || !userData.last_name || !userData.username) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.first_name, userData.last_name, userData.username, userData.password);
    emailInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, first_name, last_name, username, password) {
    $.post("/api/login", {
      email: email,
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    })
      .then(function(data) {
        window.location.replace("/chat");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

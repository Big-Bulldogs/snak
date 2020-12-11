// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var passport = require("./config/passport");
var exphbs = require("express-handlebars");
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = require('express')();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


io.on('connection', (socket) => {
  console.log('connection success')
  socket.on('disconnect', () => {
      console.log('disconnect success')
  })
socket.on('message', (msg) => {
    console.log('Message: ' + msg)
    io.emit('message', msg)
})
})
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

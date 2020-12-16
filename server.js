var app = require('express')();
var passport = require("./config/passport");
var session = require("express-session");
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var express = require('express')
var db = require("./models");
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
  });
app.use(express.static('public'))

  io.on('connection', (socket) => {
      console.log('connection success')
      socket.on('disconnect', () => {
          console.log('disconnect success')
      })
    socket.on('message', (msg) => {
        console.log('Message: ' + msg)
        io.emit('message', msg)
    })

    socket.emit('room.joined', socket.id + ' joined the room');
    socket.on('room.join', function(room){
      socket.join(room);
      io.to(room).emit('room.joined', socket.id + ' joined ' + room)
    })
  })

  require("./routes/html-routes.js")(app);
  
  require("./routes/api-routes.js")(app);
  db.sequelize.sync({force: true}).then(function() {
  http.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  })
});

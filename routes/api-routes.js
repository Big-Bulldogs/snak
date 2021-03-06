// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const uuid = require('uuid');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      id: uuid.v4(),
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  //Route for updating rooms user has joined
  app.put('/api/users', (req, res) => {
    const { id, rooms_joined } = req.body;
    db.User.update({ rooms_joined }, { where: { id } }).then(dbUser => res.json(dbUser));
  });

  //route for updating usernames
  app.put('/api/usernames', (req, res, err) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
    db.User.update(
      {username: req.body.newUsername},
      {where: {username: req.user.username}} 
      ).then(function(data) {
        res.json(data);
        console.log('data:', data)
      });
    }
  });

  //route for getting user info
  app.get('/api/user_info', (req, res) => {
    // The user is not logged in, send back an empty object
    if (!req.user) {
      res.json({});
    } else {
       db.User.findAll({}).then(function(results) {
        res.json({
          email: req.user.email,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          username: req.user.username,
          createdAt: req.user.createdAt,
          id: req.user.id
        });
       })
    }
  });

  app.post("/api/rooms", function(req, res) {
    db.Rooms.create({
      id: uuid.v4(),
      room_name: "/" + req.body.room_name
    }).then(function(results){
      res.json(results)
    })
  })
  
  //GET route for all the rooms
  app.get("/api/rooms", function(req, res) {
    db.Rooms.findAll({}).then(function(results) {
      res.json(results);
    });
  });
}

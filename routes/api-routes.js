// Requiring our models and passport as we've configured it
var db = require("../models");
const axios = require("axios");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully,
  // proceed to log the user in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for creating a new quote. Pass through the author name (one of the Kards), the
  // text of the quote (body) and the UserId.
  app.post("/api/quote", function(req, res) {
    db.Quote.create({
      author: req.body.author,
      body: req.body.body,
      UserId: req.user.id
    })
      .then(function(dbQuote) {
        console.log(dbQuote); //dbQuote.dataValues
        res.json(dbQuote);
        //res.status(200).json(dbQuote);
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for creating a new comment. Pass through the Quote Id the comment refers to, the
  // text of the comment (body) and the UserId.
  app.post("/api/comment", function(req, res) {
    db.Comment.create({
      comment: req.body.comment, //.comment
      UserId: req.user.id, //.id
      QuoteId: req.body.QuoteId //parseInt('11')
    })
      .then(function(dbComment) {
        console.log(dbComment.dataValues);
        res.json(dbComment);
      })
      .catch(function(err) {
        console.log(err);
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
        id: req.user.id
      });
    }
  });

  app.get("/api/random/kardashian", function(req, res) {
    // set the apikey and limit
    var apikey = process.env.TENOR_API_KEY;
    var lmt = 8;

    // test search term
    const kardashians = ["khloe", "kim", "kourtney"];
    var search_term_first =
      kardashians[Math.floor(Math.random() * kardashians.length)];
    var search_term_last = "kardashian";
    var search_term = search_term_first + search_term_last;

    // using default locale of en_US
    var search_url =
      "https://api.tenor.com/v1/search?q=" +
      search_term +
      "&key=" +
      apikey +
      "&limit=" +
      lmt;

    axios.get(search_url).then(function({ data }) {
      var randonNum = Math.floor(Math.random() * data.results.length);
      const img = data.results[randonNum].media[0].gif.url;
      res.send(img);
    });
  });
};
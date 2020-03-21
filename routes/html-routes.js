// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) return res.render("index");

    db.Quote.findAll().then(function(dbQuotes) {
      res.render("main", {
        layout: "loggedin",
        quotes: dbQuotes.map(quote => quote.toJSON())
      });
    });
  });

  app.get("/quote/:id", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) return res.redirect("/");

    db.Quote.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Comment,
          include: [db.User]
        }
      ],
      order: [[db.Comment, "createdAt", "DESC"]]
    }).then(function(dbQuote) {
      res.render("quote", {
        layout: "loggedin",
        quote: {
          id: dbQuote.id,
          author: dbQuote.author,
          body: dbQuote.body
        },
        comments: dbQuote.Comments.map(comment => comment.toJSON())
      });
    });
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/");
    }

    res.render("login");
  });
};

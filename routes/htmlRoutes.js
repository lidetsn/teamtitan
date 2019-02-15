var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });

  // app.get("/auth", function(req, res) {
  //   if (req.user) {
  //     res.redirect("/dashboard");
  //   }
  //   res.render(path.join(__dirname, "../views/index.handlebars"));
  // });

  app.get("/auth", function(req, res) {
    res.render("auth");
  })

  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.render(path.join(__dirname, "../views/dashboard.handlebars"));
  });
};


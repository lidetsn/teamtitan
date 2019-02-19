var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // find all users
  app.post("/api/login", 
  passport.authenticate("local", { failureRedirect: '/' }),
  function (req, res) {
    console.log("hello");
    res.redirect("/dashboard")
  });

  app.get("/api/postuser", function (req, res) {
    db.authTable.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.post("/api/postuser", function (req, res) {
    console.log("Attempting to create");
    db.authTable.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
      .then(function () {
        console.log("complete");
        window.location.href = "/";
        res.redirect(307, "api/login");
      }).catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.authTable) {
      res.json({});
    }
    else {
      res.json({
        email: req.authTable.email,
        id: req.authTable.id
      });
    }
  });
};
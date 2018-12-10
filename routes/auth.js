const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/todo");
    }
  );
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("http://localhost:3000/todo");
    }
  );

  // Register a user
  const registerUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };

  app.post("/auth/checkPersonal", (req, res) => {
    console.log(req.body);
    req.checkBody("first_name", "First name is required").notEmpty();
    req.checkBody("last_name", "Last name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    if (req.body.email) {
      req.checkBody("email", "Email is not valid").isEmail();
    }
    let errors = req.validationErrors();
    if (errors) {
      res.send({ error: errors });
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          res.send({ error: [{ msg: "User already exists" }] });
        } else {
          res.send({ success: "Continue" });
        }
      });
    }
  });
  app.get("/auth/current_user", (req, res) => {
    console.log(`here is the actual request object user ${req.user}`);
    if (req.user) {
      res.json(req.user);
    }
  });
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
  });
};

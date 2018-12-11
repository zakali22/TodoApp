const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  app.post("/auth/addUser", (req, res) => {
    console.log(req.body);
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password", "Password must be at least 5 characters")
      .isLength({ min: 5 });
    req
      .checkBody("confirm_password", "Passwords do not match")
      .equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.send({ error: errors });
    } else {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        name: `${req.body.first_name} ${req.body.last_name}`
      });
      registerUser(user, (err, user) => {
        console.log(user);
        if (err) {
          console.log(err);
        }
      });
      res.send({ success: "Successfully registered" });
    }
  });
  app.post("/auth/logUser", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send([info]);
      }
      req.logIn(user, function(err) {
        console.log(user);
        if (err) {
          return next(err);
        }
        console.log(user);
        return res.send({ success: "Successfully logged in" });
      });
    })(req, res, next);
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

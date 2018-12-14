const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const path = require("path");
const cors = require("cors");
const expressValidator = require("express-validator");

const keys = require("./config/keys");
require("dotenv").config({ path: ".env" });

const optionsCors = {
  origin: "*",
  optionSuccessStatus: 200
};

app.use(cors(optionsCors));

const url = keys.mongo_uri;
mongoose.connect(
  url,
  {
    useNewUrlParser: true
  },
  function(err, client) {
    if (err) {
      console.log(err);
    }
    console.log(url);
  }
);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
    keys: [keys.cookieKey]
  })
);

// Express Messages
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  res.locals.user = req.user || null;
  next();
});

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      const namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");
require("./routes/auth")(app);
require("./routes/api")(app);

process.env.PWD = process.cwd();

// Conditional Production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("clientside/build"));
  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/todo", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/signin", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/register", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

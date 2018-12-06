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

const keys = require("./config/keys");

const optionsCors = {
  origin: "*",
  optionSuccessStatus: 200
};

app.use(cors(optionsCors));

const url = keys.mongo_uri;
mongoose.connect(
  url,
  { useNewUrlParser: true }
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

// Passport
app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");
require("./routes/auth")(app);

const PORT = process.env.PORT | 5000;
app.listen(PORT);

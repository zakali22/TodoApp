const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
  email: String,
  first_name: String,
  last_name: String,
  image: {
    type: String,
    default:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=113636006274386&height=50&width=50&ext=1541469489&hash=AeRoGBFqPCzpHyQ2"
  },
  todos: {
    type: Array,
    default: []
  },
  complete: {
    type: Array,
    default: []
  }
});

mongoose.model("users", userSchema);

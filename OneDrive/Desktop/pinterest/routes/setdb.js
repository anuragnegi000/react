const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose"); 
mongoose.connect("mongodb://127.0.0.1:27017/resume_builder");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type: String, // Assuming this is a URL to the user's profile picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("CollectionPIN", userSchema);



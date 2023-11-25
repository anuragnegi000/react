const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  // Assuming you want to associate posts with users
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionPIN '
  },
});

module.exports = mongoose.model("Post", postSchema);



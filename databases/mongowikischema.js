const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    username: {type:String, required: true},
    author: {type:String, required: true},
    title: {type:String, required: true},
    content: {
      type: String,
      maxlength: 500,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  });
const wikis = mongoose.model("wikis", blogPostSchema);
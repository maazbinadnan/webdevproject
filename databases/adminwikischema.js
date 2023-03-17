const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    username: {type:String, required: true},
    email: {type:String, required: true},
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
const adminwiki = mongoose.model("wiki", blogPostSchema ,"wiki");
module.exports = adminwiki;
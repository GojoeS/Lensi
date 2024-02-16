import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: {type: String, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  parentId:{
    type: String,
    required: true
  }
})
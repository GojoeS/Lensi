import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  parentId:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reply: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply"
    }
  ]
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
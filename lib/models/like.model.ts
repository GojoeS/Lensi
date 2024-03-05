import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
})

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema)

export default Like
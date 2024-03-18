import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id:{type: String, required: true},
  username:{type: String, required: true, unique: true},
  name:{type: String, required: true},
  image:{type: String, required: true},
  bio:{ type: String },
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  onboarded:{
    type: Boolean,
    default: false,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  follower: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ]
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
  },
    firstName : {
      type: String,
      required: true,
    },
    lastName : {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    location: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
  },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
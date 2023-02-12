import Post from "../models/Post.js";
import User from "../models/User.js";


// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { userId, title, description, categories, picturePath } = req.body;
        const user = await User.findById(userId);
        if(user){
            const newPost = new Post({
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                title,
                description,
                categories,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    } else {
     res.status(404).json({ message: "user not found" })   
    }} 
    catch (err) {
        res.status(500).json({ message: err.message  })
    }
}

// UPDATE POST
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          try {
            const updatedPost = await Post.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedPost);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE POST
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          try {
            await post.delete();
            res.status(200).json("Post has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can delete only your post!");
        }
      } catch (err) {
        res.status(500).json(err);
    }
}

// GET POST
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({createdAt: -1 });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL POST
export const getAllPosts = async (req, res) => {
    const userId = req.query.userId;
    const catName = req.query.cat;
    try {
        let posts;
        if (userId) {
            posts = await Post.find({ userId }).sort({createdAt: -1 });
        } else if (catName) {
            posts = await Post.find({
                categories: {
          $in: [catName],
        },
      }).sort({createdAt: -1 });
        } else {
      posts = await Post.find().sort({createdAt: -1 });
        }
        res.status(200).json(posts);
    } catch (err) {
    res.status(500).json(err);
    }
}

// LIKE POST
export const likePost = async(req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set( userId, true );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
         res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}



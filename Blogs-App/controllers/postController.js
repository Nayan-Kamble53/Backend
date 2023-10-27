const Post = require("../models/postModel")

//creating a post
exports.createPost = async (req, res) => {
    try {
        //fetch data
        const {user, title, body} = req.body;
        const newPost = await Post.create({user, title, body});

        res.json({
            post: newPost,
        })
    }

    catch(error) {
        return res.status(400).json({
            error: "Error while creating a post",
        })
    }
}


//this is for fetching all the posts
exports.fetchAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('likes').populate('comments').exec();
        res.json({
            posts,
        })
    } 

    catch(error) {
        return res.status(400).json({
            error: "Error while fetching posts",
        })
    }
}
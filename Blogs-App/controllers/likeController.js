//import models
const Post = require('../models/postModel');
const Like = require('../models/likeModel');

//like a post
exports.likePost = async (req, res) => {
    try {
        const {post, user} = req.body;
        const like = await Like.create({post, user});

        //update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: like._id}}, {new: true})
                            .populate('likes')
                            .exec(); 
        
        res.json({
            post: updatedPost,
        });
    }

    catch(error) {
        return res.status(400).json({
            error: "Error while liking posts",
        })
    }
}


//unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const {post, like} = req.body;

        //jis bhi pehli entry mei post and like ye dono parameter match kr jayege usko delete krdo
        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        //update the post collection
        //likes ke andr jiski id {likes: deletedLike._id} ye hai usko delete krna hai ($pull) se
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});

        res.json({
            post: updatedPost,
        })
    }

    catch(error) {
        return res.status(400).json({
            error: "Error while unliking posts",
        })
    }
}
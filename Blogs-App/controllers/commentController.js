//import models
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req, res) => {
    try {
        //fetch data from req body
        const {post, user, body} = req.body;

        //create a new object and insert in into DB using create
        const comment = await Comment.create({post, user, body});

//post se id search kr li, comments wale array mei comment ki id ko insert krege, {new:true} mtlb jo bhi add or updation kia hai vo new updated document by default return krao otherwise old document return hoga
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: comment._id}}, {new: true})
        .populate("comments") //yahape comments ki id's hai but agar hume uss id se related document chaiye toh hum use krege 
        .exec()
        
        res.json({
            post: updatedPost,
        })
    }

    catch(err) {
        return res.status(500).json({
            err: "Error while creating comment"
        })
    }
}
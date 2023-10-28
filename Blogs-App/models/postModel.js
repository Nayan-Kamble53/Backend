const mongoose = require('mongoose');

//route handler
const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    likes: [{
        //jb kisi aur model ko kisi aur model mei refer krte hai on the basis of id then hum aise likhege
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],

    comments: [{
        type : mongoose.Schema.Types.ObjectId ,
        ref: "Comment"
    }]
});

//Post name se refer kr ske isliye postSchema ko Post name se export kia
module.exports = mongoose.model("Post", postSchema); 
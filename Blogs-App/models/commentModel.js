const mongoose = require('mongoose');

//route handler
const commentSchema = new mongoose.Schema({
    post: { //KONSI POST PR COMMENT KRRA HAI
        //jb kisi aur model ko kisi aur model mei refer krte hai on the basis of id then hum aise likhege
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",  //this is the reference to the post model
    },

    user: { //KONSA USER COMMENT KRRA HAI
        type:String,
        required: true,
    },

    body: { //KYA COMMENT KRRA HAI
        type: String,
        required: true,
    }
});

//commentSchema ko Comment naam se export kr dia
module.exports = mongoose.model("Comment", commentSchema);
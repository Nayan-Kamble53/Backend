const mongoose = require('mongoose');

//route handler
const likeSchema = new mongoose.Schema({
    post: { //KONSI POST LIKE KRRE HO
        //jb kisi aur model ko kisi aur model mei refer krte hai on the basis of id then hum aise likhege
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post",  //this is the reference to the post model
    },

    user: { //KONSA USER POST LIKE KRRA HAI
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("Like", likeSchema);
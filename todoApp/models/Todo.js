const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true,
            maxLength: 50,
        },
        description: {
            type:String,
            required: true,
            maxLength: 50,
        },
        createdAt: { //this shows timestamp at what time it is created
            type:Date,
            required: true,
            default: Date.now(), //default time will be set to current time
        },
        updatedAt: {
            type:Date,
            required: true,
            default: Date.now(),
        }
    }
)

//anyone can access this schema by the name "Todo"
module.exports = mongoose.model("Todo", todoSchema);
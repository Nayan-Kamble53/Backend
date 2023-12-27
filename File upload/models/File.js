const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
})

//post middleware 
fileSchema.post("save", async function(doc) { //by this doc we refering to the DB entry
    try {
        console.log("Doc", doc);

        //create a transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> <p>File uploaded <br/> View here: <a href="${doc.url}">${doc.url}</a></p>`,
        })  
        console.log(info)
    }   
    catch(error) {
        console.error(error);
    }
})

module.exports = mongoose.model("File", fileSchema);
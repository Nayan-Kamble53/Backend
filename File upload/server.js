const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000

//adding middlewares
app.use(express.json());
const fileupload = require('express-fileupload'); //this is a fileupload middleware
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const db = require("./config/database");
db.dbConnect();

//connect with cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//add(mount) the api routes
const Upload = require('./routes/FileUpload');
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
})
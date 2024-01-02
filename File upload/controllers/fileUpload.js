const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload handler
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file; //we have to write this .file in the form-data field in the postman under key 
        console.log("File-->", file);

        //apne server pe kis path pe file ko store krna hai
        //__dirname mtlb current working directory which is controllers
        //"/files/" mtlb jis directory mei ho usme ek files name ka folder rkho 
        //Date.now() se file ka name bnega
        //file.name ko "." ke basis pr split kia and jo 1 index pe tha usko return kr dia (this is for extension)
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("Path---->", path);

        //file ko kahape move krna hai
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully",
        });

    } catch(error) {
        console.log(error);
    }
}

//jo uploaded file ka type hai vo check krna hai supportedTypes mei hai ke nhi.
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

//upload files to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto"; //automatically detects file type and always have to write while uploading to cloudinary
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//image upload handler
exports.imageUpload = async (req, res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation of image type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                messge: "File format is not supported",
            })
        }

        //file format supported hai:- Upload on cloudinary
        const response = await uploadFileToCloudinary(file, "Nayan"); //folder name is "Nayan" in cloudinary
        console.log(response);

        //save the entry into the DB
        const fileData = await File.create({
            name, tags, email, url:response.secure_url,
        })

        res.json({
            success: true,
            url: response.secure_url,
            message: "Image uploaded successfully",
        })
    } 
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


//video upload handler
exports.videoUpload = async (req, res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //Validation of video type
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
 
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                messge: "File format is not supported",
            })
        }
          
         //file format supported hai:- Upload on cloudinary
        const response = await uploadFileToCloudinary(file, "Nayan"); //folder name is "Nayan" in cloudinary
        console.log(response);

        const fileData = await File.create({
            name, tags, email, url:response.secure_url,
        })

        res.json({
            success: true,
            url: response.secure_url,
            message: "Video uploaded successfully",
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


//imageSizeReducer handler
exports.imageSizeReducer = async (req, res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation of image type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                messge: "File format is not supported",
            })
        }

        //file format supported hai:- Upload on cloudinary
        const response = await uploadFileToCloudinary(file, "Nayan"); //folder name is "Nayan" in cloudinary
        console.log(response);

        //save the entry into the DB
        const fileData = await File.create({
            name, tags, email, url:response.secure_url,
        })

        res.json({
            success: true,
            url: response.secure_url,
            message: "Image uploaded successfully",
        })
    } 
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
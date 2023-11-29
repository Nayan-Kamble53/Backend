//middlewares: authenticate middleware for authenticity, isStudent and isAdmin for authorization

const jwt = require("jsonwebtoken");
require("dotenv").config();

//next means agar req mei 2 or more middleware hai toh next wale ke lie call lgegi next ki taki hum next pe move kr paaye
exports.authenticate = (req, res, next) => { 
    try {
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));
        
        //extract JWT token
        //1: req ki body se token nikalo, 2: agar koi cookie already hai toh usse token nikal lo
        //3: req ke header ke "Authorization" key ki value nikalo jo hai Bearer space token and "Bearer " ko replace kro empty string se toh sirf token bachega
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET); //yahase token mei pass kia data access kr skte ho
            console.log(decode);

            req.user = decode; //decoded data req.user mei pass kr dia cause baadme access krege next middleware mei
        } catch(error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next(); //next middleware pe jane ke lie next ko call kr dia
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Students'
            })
        }
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        })
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin'
            })
        }
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        })
    }
}
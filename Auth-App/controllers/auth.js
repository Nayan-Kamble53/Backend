const bcrypt = require('bcrypt');
const userData = require("../models/userData");
const jwt = require('jsonwebtoken');
require('dotenv').config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await userData.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10); //(password: kise tum hash krna chahte ho, 10: kitne rounds)
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password"
            })
        }

        //create entry for user
        const user = await userData.create({
            name, email, password:hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    }

    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later!"
        })
    }
}


//login route handler
exports.login = async (req, res) => {
    try {
        //fetch data
        const {email, password} = req.body;

        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all the details carefully!" 
            })
        }

        //check for registered user 
        let user = await userData.findOne({email});

        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };
        //verify password and generate JWT token
        if(await bcrypt.compare(password, user.password)) //1st param: data, 2nd param: encrypted data which was present in db
        {
            //password match
            //payload mtlb exact data or body of data
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});

            user = user.toObject();
            user.token = token; //jo token upr create kia usko user mei add kr dia
            user.password = undefined; //ye password user ke object se hide kia hai DB se nhi

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //abse leke 3 din utne miliseconds
                httpOnly: true,
            }

            //"token" is its name, token is value and we sent some options
            res.cookie("token", token, options).status(200).json({
                success: true,
                token, 
                user,
                message: "User Logged in successfully",
            });
        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }

    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        })
    }
}
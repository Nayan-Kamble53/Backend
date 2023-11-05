const express = require('express');
const router = express.Router();
const userData = require("../models/userData");

const {login, signup} = require('../controllers/auth');
const {authenticate, isStudent, isAdmin} = require('../middlewares/middleware');

router.post('/login', login);
router.post('/signup', signup);

//protected route (only that person will access this route who has authorization to this)
router.get("/student", authenticate, isStudent, (req, res) => { 
    //"/student" ye path hai route ka, bichme authenticate and isStudent middlewares use ho rhe hai, aur last mei callback function likh dia
    res.json({
        success: true,
        message: "Welcome to protected route for Students"
    })
});

router.get("/admin", authenticate, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin"
    })
});


//how to find a user data using id
router.get("/getEmail", authenticate, async (req, res) => {
    try {
        const id = req.user.id;
        const user =  await userData.findById(id);

        res.status(200).json({
            success: true, 
            user: user,
            message: 'Welcome to the email route'
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'error occurred'
        })
    }
});

module.exports = router;
const express = require('express');
const router = express.Router(); //we have to create routes so we create using it

//import controller
const {createTodo} = require("../controllers/createTodo");
const {getTodo, getTodoById} = require("../controllers/getTodo");
const {updateTodo} = require("../controllers/updateTodo");
const {deleteTodo} = require("../controllers/deleteTodo");

//yahape post route create kia hai and usko controller se map kia hai
router.post("/createTodo", createTodo); 

//yahape get route create kia
router.get("/getTodo", getTodo); 
router.get("/getTodo/:id", getTodoById); 

//yahape route ko update kia
router.put("/updateTodo/:id", updateTodo);

//yahape route ko delete krege
router.delete("/deleteTodo/:id", deleteTodo); 

module.exports = router;
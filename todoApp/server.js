const express = require("express");
const app = express();

//load config from env file for that we have to install (npm i dotenv)
require("dotenv").config();
const PORT = process.env.PORT || 4000; //ya to port PORT se aayega or 4000 hoga

//controller mei {title, desc} parse kia hai toh uske liye parser lgega
app.use(express.json()); //it is also called Middleware

//import routes for Todo API
const todoRoutes = require('./routes/todos');

//add the todo API routes
app.use("/api/v1", todoRoutes); //localhost wale url ke baad /api/v1 aayega and uske baad jo bhi route todoRoutes mei hai vo aayega

//start the server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require('./config/database'); //yahape DB ko import kia "require" ka use krke
dbConnect(); //yahape dbConnect() ko call krke connection establish kr dia hai

//default route (it is homepage which shows the text in h1)
app.get("/", (req,res) => {
    res.send(`<h1>This is Home Page.</h1>`);
})
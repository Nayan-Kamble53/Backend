const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const blog = require('./routes/blogs');
app.use('/api/v1', blog);

//connect db
const dbConnect = require('./config/database');
dbConnect();

//start the server
app.listen(PORT, () => {
    console.log(`Server is started at Port number ${PORT}`);
})

//default route to show on UI
app.get('/', (req, res) => {
    res.send(`<h1>This is Home Page.</h1>`);
}) 
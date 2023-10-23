const express = require('express'); //create a instance of Express
const app = express(); //name the instance of Express as app

//used to parse req.body to express --> We use this in PUT or POST
const bodyParser = require('body-parser');

//specifically parse json() data & add it to req.body object
app.use(bodyParser.json());

app.listen(5000, () => { //set a port for server(5000)
    console.log("server is started at 5000");
});

// '/' mtlb route jahape display hoga
app.get('/', (request, response) => { //send a request to server to display something
    response.send("Hello world");
});

app.post('/api/cars', (request, response) => {
    const {name, car} = request.body; //req.body ke andr data hai 
    console.log(name);
    console.log(car);
    response.send("Car submitted successfully");
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nayan', {
    useNewUrlParser:true,
    useUnifiedTopology:true, 
})
.then(() => {console.log("Connection Successful")})
.catch( (error) => {console.log("Received an error")})
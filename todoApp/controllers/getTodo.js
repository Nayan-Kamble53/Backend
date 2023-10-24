//import the model
const Todo = require("../models/Todo");

//This will fetch all the data on that route
//define routeHandler to handle the routes
exports.getTodo = async(req, res) => {
    try {
        //fetch all todo items from database
        const todos = await Todo.find({}); //agar yahape koi parameter pass ni kia {} mtlb saare items le aao

        //respose of above fetch
        res.status(200)
        .json({
            success: true,
            data: todos,
            message: "Entire Todo data is fetched",
        })
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success: false,
            data: 'server error',
            message: err.message,
        })
    }
}


//This will fetch data of only one url according to their id
exports.getTodoById = async(req, res) => {
    try {
        //extract todo items basis on id
        const id = req.params.id; //fetch id
        
        //we got _id from database, how the data is stored there is _id
        const todo = await Todo.findById({_id: id});

        //data for given id not found
        if(!todo) {
            return res.status(404).json({
                success: false,
                message: "No data found for the given id",
            })
        }
        //data found for the given id
        res.status(200).json({
            success:true,
            data: todo,
            message: `Todo ${id} data successfully fetched`
        })
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success: false,
            data: 'server error',
            message: err.message,
        })  
    }
}
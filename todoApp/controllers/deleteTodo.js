//import the model
const Todo = require("../models/Todo");

//define routeHandler to handle the routes
exports.deleteTodo = async(req, res) => {
    try {
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message: "Todo Deleted",
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
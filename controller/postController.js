const post = require('../models/post');

let Modules = function () {

//Create Post: -
this.createPost = async(req, res) => {
    const todo = new post(req.body);
    try{
        await todo.save();
        res.status(200).send("Posted todo data succsfully")
    }catch{
        res.status(500).send("Error posting todo data")
    }
}
//GET All Post: -
this.findAllPost = async(req, res) => {
    try{
        const todo = await post.find();
        res.status(200).send(todo);
    }catch{
        res.status(500).send("Error fetching todo data")
    }
}
//Update post: -
this.updateById = async(req, res) => {
    try{
        const todo = await post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send(todo);
    
    }catch{
        res.status(500).send("Error updating todo data")
    }
}
//Delete Post: -
this.deleteById = async(req, res) => {
    try{
        const todo = await post.findByIdAndDelete(req.params.id);
        res.status(200).send(todo)
    }catch{
        res.status(404).send("Error Updating the data")
    }
}
}
module.exports = new Modules();
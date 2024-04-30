const post = require("../models/post");

let Modules = function () {
  //Create Post: -
  this.createPost = async (req, res) => {
    const todo = new post({ ...req.body, createdBy: req.user._id });
    try {
      await todo.save();
      res.status(200).send({
        sucess: true,
        message: "Posted todo data succsfully",
      });
    } catch (err) {
      res.status(400).send({
        sucess: false,
        error: err.message,
      });
    }
  };

  //GET All Post: -
  this.findAllPost = async (req, res) => {
    try {
      const todo = await post
        .find()
        .populate({ path: "createdBy", select: "name email -_id" });
      res.status(200).send(todo);
    } catch (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  };

  //Update post: -
  this.updateById = async (req, res) => {
    try {
      const todo = await post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res
        .status(200)
        .send({ sucess: true, message: "Updated Data succsfully" });
    } catch {
      res.status(400).send("Error updating todo data");
    }
  };

  //Delete Post: -
  this.deleteById = async (req, res) => {
    try {
      const todo = await post.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .send({ sucess: true, message: "Deleted Data succsfully" });
    } catch {
      res.status(400).send("Error Updating the data");
    }
  };

  // get data by lat and long : -
  this.getPostByLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const posts = await post
        .find({
          'geoLocation.coordinates': [Number(latitude), Number(longitude)]
        })
        .populate({ path: "createdBy", select: "name email -_id" });
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  //Fatching Dash board data : -
  this.dashboard = async (req, res) => {
    try {
      const activePosts = await post
        .find({ status: "Active" })
        .populate({ path: "createdBy", select: "name email -_id" });
      const inactivePosts = await post
        .find({ status: "Inactive" })
        .populate({ path: "createdBy", select: "name email -_id" });
      const activeCount = activePosts.length;
      const inactiveCount = inactivePosts.length;
      res
        .status(200)
        .json({ activeCount, inactiveCount, activePosts, inactivePosts });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

};
module.exports = new Modules();

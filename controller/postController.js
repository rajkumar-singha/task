const post = require("../models/post");

let Modules = function () {
  //Create Post: -
  this.createPost = async (req, res) => {
    const todo = new post(req.body);
    try {
      await todo.save();
      res.status(200).send("Posted todo data succsfully");
    } catch {
      res.status(500).send("Error posting todo data");
    }
  };
  //GET All Post: -
  this.findAllPost = async (req, res) => {
    try {
      const todo = await post.find();
      res.status(200).send(todo);
    } catch {
      res.status(500).send("Error fetching todo data");
    }
  };
  //Update post: -
  this.updateById = async (req, res) => {
    try {
      const todo = await post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(todo);
    } catch {
      res.status(500).send("Error updating todo data");
    }
  };
  //Delete Post: -
  this.deleteById = async (req, res) => {
    try {
      const todo = await post.findByIdAndDelete(req.params.id);
      res.status(200).send(todo);
    } catch {
      res.status(404).send("Error Updating the data");
    }
  };

  //
  this.getPostByLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const posts = await post.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
          },
        },
      });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  this.dashboard = async (req, res) => {
    try {
      const activePosts = await post.find({ status: "Active" });
      const inactivePosts = await post.find({ status: "Inactive" });
      const activeCount = activePosts.length;
      const inactiveCount = inactivePosts.length;
      res.json({ activeCount, inactiveCount, activePosts, inactivePosts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
module.exports = new Modules();

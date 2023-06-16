const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../Models');
//Create a New Blog Post
router.post('/', async (req, res) => {
  // if(!req.session.logged_in){
  //   return res.status(403).json({msg:"login first!"})
  // }
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // Get all Blog Posts
router.get("/", async (req, res) => {
    try {
        const data = req.params.id;
      const dbData = await Blog.findAll({include: [User, Comment]});
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no blogs in database!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get blogs", err: err });
    }
  });
  //Delete a Blog Post
  router.delete('/:id', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(403).json({msg:"login first!"})
    }
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
const express = require('express');
const router = express.Router();
const {Blog, Comment} = require('../../Models');
//Create a New Blog Post
router.post('/', async (req, res) => {
    try {
      const blogData = await Blog.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = blogData.id;
        req.session.logged_in = true;
  
        res.status(200).json(blogData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // Get all Blog Posts
router.get("/", async (req, res) => {
    try {
      const dbData = await Blog.findAll({include: {model:Comment}});
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no blogs in database!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get blogs", err: err });
    }
  });
module.exports = router;
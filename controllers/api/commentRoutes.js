const express = require('express');
const router = express.Router();
const {Comment, User, Blog} = require("../../Models")

//Create a Comment
router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = commentData.id;
        req.session.logged_in = true;
  
        res.status(200).json(commentData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
   // Get all Comments
router.get("/", async (req, res) => {
    try {
      const dbData = await Comment.findAll();
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no comments in database!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get comments", err: err });
    }
  });
module.exports = router;
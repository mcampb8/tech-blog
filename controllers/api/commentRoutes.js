const express = require('express');
const router = express.Router();
const {Comment, User, Blog} = require("../../Models")

//Create a Comment
router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create(req.body);

      res.status(200).json(commentData);
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
   //Update a Comment
   router.put("/:id", (req, res) => {
    if(!req.session.logged_in){
      return res.status(403).json({msg:"login first!"})
    }
    Comment.update(
      {
        text: req.body.text
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedComment) => {
        res.json(updatedComment);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
    //Delete a Comment
    router.delete('/:id', async (req, res) => {
      if(!req.session.logged_in){
        return res.status(403).json({msg:"login first!"})
      }
      try {
        const commentData = await Comment.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
    
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
module.exports = router;
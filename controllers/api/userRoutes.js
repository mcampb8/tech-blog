const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../Models');

//Create a New User
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  //Check to see if the data matches an existing user
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});
  // Log a user out
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  // Get all Users
  router.get("/", async (req, res) => {
    try {
      const dbData = await User.findAll({include: [{model:Blog, include: [Comment]}]})
      if (dbData.length === 0) {
        return res.status(404).json({ msg: "no users in database!" });
      }
      return res.json(dbData);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "could not get users", err: err });
    }
  });

module.exports = router;
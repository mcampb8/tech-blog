const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({
        include:[User],
        include:[Comment]
    }).then(blogData=>{
        const hbsData = blogData.map(blog=>blog.get({plain:true}));
        console.log(hbsData);
        res.render("homepage",{
            allBlogs:hbsData,
            logged_in: req.session.logged_in
        })
    })
});
router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/dashboard")
    }
    res.render("login",{
        logged_in:req.session.logged_in
    })
})
module.exports = router;
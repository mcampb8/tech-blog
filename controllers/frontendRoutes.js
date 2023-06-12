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
// Get all of a user's posts
router.get("/dashboard",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    } else {
        User.findByPk(req.session.user_id,{
            include:[Blog]
        }).then(userData=>{
            const hbsData = userData.get({plain:true})
            console.log(hbsData)
            hbsData.logged_in=req.session.logged_in;
            res.render("dashboard",hbsData)
        })
    }
})
module.exports = router;
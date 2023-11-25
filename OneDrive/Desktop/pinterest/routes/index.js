var express = require('express');
var router = express.Router();
const userModel = require("./setdb");
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createuser",async function(req,res,next){
  let createduser = await userModel.create({
    username: "anuragnegi000",
    password: "random",
    posts: [],
    email:"anurag.negi862@gmail.com",
    fullName: "AnuragNegi"
  });
  res.send(createduser);
});

router.get("/alluserposts",async function(req,res,next){
  let user = await userModel.findOne({_id: "65616ff1151eff7b4e5aa98f"})
  .populate('posts');
  res.send(user);
});

router.get("/createpost", async function(req,res){
    let createdpost = await postModel.create({
      postText:"Hello my first post pinterest",
      user: "65616ff1151eff7b4e5aa98f"
    });
    let user = await userModel.findOne({_id: "65616ff1151eff7b4e5aa98f"});
    user.posts.push(createdpost._id);
    await user.save();
    res.send("done");
});

router.get("/profile",isLoggedIn,function(req,res,next){
  res.render("main");
})

router.get("/login",function(req,res,next){
  res.render('login');
})



router.post("/register", function(req,res){
  const {username,email,fullName}= req.body;
  const userData = new userModel({username,email,fullName});

  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
  });

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/"  
}),function(req,res){
});

router.get("logout",function(req,res){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect("/");
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
  res.redirect("/");
}

module.exports = router;

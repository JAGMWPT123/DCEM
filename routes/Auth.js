const express = require('express')
const router  = express.Router()
const passport = require("passport");

const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

const User = require("../modules/user.js");
const app = express();
const path = require('path')


//########## passport auth
app.use(require('express-session')({
    secret:'your-secret-key',
     resave:true,
     saveUninitialized:true
    }));
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//########################

//############ Login
router.get('/login',(req,res)=>{
    res.render('login')
    console.log(req.body)
})

router.post('/login',(req,res)=>{
    
    try {
        passport.authenticate('local',{
            successRedirect : res.redirect("/dashbard"),
            failureRedirect : res.redirect('/login')
        })
       // console.log(req.body);
    } catch (error) {
        console.log(error);
        return res.redirect('login');
    }
})
//###########################################

//############## register
router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
    console.log('|>> registering user');
    //return res.json(req.body)
    try {
        User.register(new User({username : req.body.username}),req.body.password,
        // (err)=>{
        //     if (err) {
        //       console.log('error while user register!', err);
        //       return next(err);
        //     }
            // passport.authenticate('local')(req,res,()=>{
            //     res.redirect('/login')
            // })
            console.log('>> user registered ')
            )
            res.redirect('/login')
    } catch (error) {
        if (error) {
                  console.log('error while user register!', error);
                  return next(error);
                }
        // console.log(error);
        return res.redirect('/register');
    }
})
//#############################################

router.get('/dashboard',(req,res)=>{
    res.render('/dashboard');//,{user : req.user})
})




router.get('/logOut',(req,res)=>{
    res.send("hello dcem");
})


function ensureAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
} 
module.exports = router;
const express=require('express');
const bodyParser= require('body-parser');
const session=require('express-session');
const passport=require('passport');
const passportfb=require('passport-facebook').Strategy;
const handlebars = require('express-handlebars');
const userSchema=require('./model/userModel');
const mongoose=require('mongoose');
const fs=require('fs');

let app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:"mysecret" }));
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost:27017/passportfb",(err)=>{
    if (err)
    {
        console.log(err);
    }else
    {
        console.log("Database connect success!");
    }   
});

app.get('/',(req,res)=>{
    res.send('Wellcome');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/auth/fb',passport.authenticate('facebook',{ scope: ['email']}));

app.get('/auth/fb/cb',passport.authenticate('facebook',{
    failureRedirect:'/',
    successRedirect:'/'
}))



passport.use(new passportfb(
    {
        clientID:"2111255632440774",
        clientSecret:"57ea79033493231a3788ad29ec94c803",
        callbackURL:"http://localhost:6969/auth/fb/cb",
        profileFields: ['id', 'displayName','gender']
    },
    (accessToken, refreshToken, profile,done)=>{
        console.log(profile);
        userSchema.findOne({id:profile._json.id},(err,user)=>{
            if (err){
                return done(err);
            }else{
                if (user) return done(null,user);
                userSchema.create({
                    id:profile._json.id,
                    name:profile._json.name,
                    gender:profile._json.gender
                },(err,newUser)=>{
                    if (err){
                        return done(err);
                    }else{
                        return done(null,newUser);
                    }
                })
            }
        })
    }
))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    userSchema.findOne({id:id},(err,user)=>{
        done(null,user)
    })
})

const port=6969;
app.listen(port,()=>{
    console.log('connect succesfull');
})

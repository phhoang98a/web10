const express=require('express');
const bodyParser= require('body-parser');
const session=require('express-session');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth2').Strategy;
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

mongoose.connect("mongodb://localhost:27017/passportgoogle",(err)=>{
    if (err)
    {
        console.log(err);
    }else
    {
        console.log("Database connect success!");
    }   
});

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/auth/google',passport.authenticate('google',{ scope: ['email','profile']}));

app.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/',
    successRedirect:'/'
}))



passport.use(new GoogleStrategy(
    {
        clientID:"200372274607-bb0be267usud1n8g00p7saco7tb2v4gb.apps.googleusercontent.com",
        clientSecret:"dGxh3-26lyg_iY7k8v-wr3aI",
        callbackURL:"http://localhost:6969/auth/google/callback"
    },
    (accessToken, refreshToken, profile,done)=>{
        console.log(profile.emails[0].value,profile.displayName,profile.id);
       
        userSchema.findOne({id:profile.id},(err,user)=>{
            if (err){
                return done(err);
            }else{
                if (user) return done(null,user);
                userSchema.create({
                    id:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value
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

const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const expressSession = require('express-session');
const userSchema=require('./models/userModel');
const fs=require('fs');

const config = require('./config');
let app = express();
const Router = express.Router();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.use(passport.initialize());
app.use(passport.session());

let http = require('http').Server(app);
var sessionStore = new expressSession.MemoryStore();
const session = expressSession({
    name : 'cookiename',
    store: sessionStore,
    secret: 'duyanhv',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
});

app.use(session);
var socket = require('./controller/socket')(http);
const userRouter = require('./routes/userRouter')(socket, app, sessionStore);
var emailUser;

app.use('/', userRouter);

app.use(express.static('public'));

mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connect Successfully");
    }
});

app.get('/auth/google',passport.authenticate('google',{ scope: ['email','profile']}));

app.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/',
}),function(req,res){
    res.redirect(`/api/login/${emailUser}`);
})

passport.use(new GoogleStrategy(
    {
        clientID:"200372274607-bb0be267usud1n8g00p7saco7tb2v4gb.apps.googleusercontent.com",
        clientSecret:"dGxh3-26lyg_iY7k8v-wr3aI",
        callbackURL:"http://localhost:6969/auth/google/callback"
    },
    (accessToken, refreshToken, profile,done)=>{
        emailUser=profile.emails[0].value;
        userSchema.findOne({googleid:profile.id},(err,user)=>{
            if (err){
                return done(err);
            }else{
                if (user) return done(null,user);
                displayName = profile.displayName;
                userSchema.create({
                    googleid:profile.id,
                    username:profile.displayName,
                    usernameLowerCase:displayName.toLowerCase(),    
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
    done(null,user.googleid);
})

passport.deserializeUser((id,done)=>{
    userSchema.findOne({googleid:id},(err,user)=>{
        done(null,user)
    })
})



http.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected on port ${config.port}`);
    }
});
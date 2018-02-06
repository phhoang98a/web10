
const express=require('express');
const bodyParser= require('body-parser');
const session=require('express-session');
const Passport=require('passport');
const handlebars = require('express-handlebars');
const LocalStrategy=require('passport-local').Strategy; 
const fs=require('fs');

let app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:"mysecret" }));
app.use(Passport.initialize());
app.use(Passport.session());
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.get('/',(req,res)=>{
    res.render('main');
})

app.get('/private',(req,res)=>{
    if (req.isAuthenticated()){
        res.send('DMM');
    }else{
        res.send('CUT');
    }
})

app.route('/login')
.get((req,res)=>{
    res.render('login');
})
.post(Passport.authenticate('local',{failureRedirect:'/login',
                                     successRedirect:'/loginOK'}))

app.get('/loginOk',(req,res)=>{
    res.send('login success') 
})                                     

Passport.use(new LocalStrategy(
    (username,password,done)=>{
        fs.readFile('./userDB.json',(err,data)=>{
            const db=JSON.parse(data);
            const userRecord= db.find(user=>user.usr==username);
            if (userRecord && userRecord.pwd==password){
                return done(null,userRecord)
            }else{
                return done(null,false)
            }
        })
    }
))

Passport.serializeUser((user,done)=>{
    done(null,user.usr)
})

Passport.deserializeUser((name,done)=>{
    fs.readFile('./userDB.json',(err,data)=>{
        const db=JSON.parse(data);
        const userRecord=db.find(user=>user.usr==name);
        if (userRecord){
            return done(null,userRecord)
        }else{
            return done(null,false)
        }
    })
})

const port=6969;
app.listen(port,()=>{
    console.log('connect succesfull');
})

//https://nodejs.vn/topic/9/t%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-passport-js-c%C3%A1c-b%C6%B0%E1%BB%9Bc-%C4%91%E1%BB%83-x%C3%A1c-th%E1%BB%B1c-t%C3%A0i-kho%E1%BA%A3n
//https://www.youtube.com/watch?v=5c_vYR7seeQ&list=PLzrVYRai0riTFtAG8O_AC_bMtLENBqpWh&index=2
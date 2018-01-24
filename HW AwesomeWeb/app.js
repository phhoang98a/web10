const express = require('express');
const bodyParser= require('body-parser');
const handlebars = require('express-handlebars');
const mongoose=require('mongoose');

const acountController=require('./controller/acountController');


let app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");


mongoose.connect("mongodb://localhost:27017/awesomeWeb",(err)=>{
    if (err)
    {
        console.log(err);
    }else
    {
        console.log("Database connect success!");
    }   
});

app.get('/',(req,res)=>{
    res.render("webMain");
})

app.post('/',(req,res)=>{
    acountController.update(req.body.username,req.body.email);
    res.send(`Welcome,${req.body.username}!`);
})

app.get('/api/check-user/:username',(req,res)=>{
    var username=req.params.username;
    acountController.checkUser(username,(err,ques)=>{
        if (err){
            console.log(err);
        }else{
            if (ques>0) {
                res.send({
                    success:false
                })
            }else{
                res.send({
                    success:true   
                })
            }
        }
    })
})

app.get('/api/check-email/:email',(req,res)=>{
    var email=req.params.email;
    acountController.checkEmail(email,(err,ques)=>{
        if (err){
            console.log(err);
        }else{
            if (ques>0) {
                res.send({
                    success:false
                })
            }else{
                res.send({
                    success:true   
                })
            }
        }
    })
})


app.use(express.static('public'));

app.listen(6969,(err)=>{
    if (err){
        console.log(err);
    };
    console.log("App is listening at port 6969");
})






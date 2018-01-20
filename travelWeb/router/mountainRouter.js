const express= require('express');
const Router=express.Router();

  
Router.get('/1',(req,res)=>{
    res.render("mountainWeb1");
})


Router.get('/2',(req,res)=>{
    res.render("mountainWeb2");
})

Router.get('/3',(req,res)=>{
    res.render("mountainWeb3");
})

 module.exports=Router;

const express= require('express');
const Router=express.Router();

  
Router.get('/1',(req,res)=>{
    res.render("seaWeb1");
})


Router.get('/2',(req,res)=>{
    res.render("seaWeb2");
})

 module.exports=Router;

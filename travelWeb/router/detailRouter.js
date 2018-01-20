const express= require('express');
const Router=express.Router();

  
Router.get('/:id',(req,res)=>{
    res.render("detail");
})



 module.exports=Router;

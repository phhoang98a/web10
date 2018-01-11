const express= require('express');
const Router=express.Router();
const fs=require('./fileController');
const QuestionShema=require('../model/questionMode');
  
Router.get('/',(req,res)=>{
    
        QuestionShema.count().exec(function (err, count) {

        var random = Math.floor(Math.random() * count);
      
       
             QuestionShema.findOne().skip(random).exec(function (err, ques) 
                   {
                    res.render("vote",{
                        layout:"otherMain",
                        variable1:ques.question
                   });  
                   })
      })

      
})

 module.exports=Router;
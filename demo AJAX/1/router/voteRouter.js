const express= require('express');
const Router=express.Router();
const voteController=require('../controller/voteController');
  
Router.get('/',(req,res)=>{
      voteController.getRandomQues((err,ques)=>{
            res.render("vote",{
                  layout:"otherMain",
                  variable1:ques.question,
                  variable2:ques._id
            })
      })
})

 module.exports=Router;
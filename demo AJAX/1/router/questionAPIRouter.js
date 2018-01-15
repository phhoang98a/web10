const express = require('express');
const Router = express.Router();
const questionController = require('../controller/questionController');

Router.post('/:id',(req,res)=>{
    if (req.body.answer=='yes'){
        setTimeout(()=>{
            questionController.updateVoteYes(req.params.name,(err,ques)=>{
                res.render("questionVoteResult",{
                    layout:false,
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                    var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
                });   
            })
        },1000);
    }else{
        setTimeout(()=>{
            questionController.updateVoteNo(req.params.name,(err,ques)=>{
                res.render("questionVoteResult",{
                    layout:false,
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                    var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
                });   
            })
        },1000);
    }
    
})

module.exports=Router;
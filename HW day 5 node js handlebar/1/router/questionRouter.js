const express= require('express');
const Router=express.Router();
const questionController=require('../controller/questionController');

Router.post('/',(req,res)=>{
    if (req.body.send=="Gửi"){
        questionController.addQuestion(req.body.question,(err,ques)=>{
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no,
                var3:50,
                var4:50
            })
        })
    }
})

Router.post('/:name',(req,res)=>{
    
    if (req.body.NO=='no'){
        questionController.updateVoteNo(req.params.name,(err,ques)=>{
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no,
                var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
            });   
        })
    }

    if (req.body.YES=='yes'){
        questionController.updateVoteYes(req.params.name,(err,ques)=>{
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no,
                var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
            });   
        })
    } 
       
    if (req.body.result=='Kết quả vote'){
        questionController.findQuesById(req.params.name,(err,ques)=>{
            if (ques.no+ques.yes==0)
            {
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:50,
                    var4:50,
                });   
            }else{
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                    var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
                });   
            }
        })
    }
})



Router.get('/',(req,res)=>{
    questionController.getRandomQues((err,ques)=>{
        if (ques.no+ques.yes==0)
            {
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:50,
                    var4:50,
                });   
            }else{
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                    var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
                });   
            }
    })
})

 module.exports=Router;
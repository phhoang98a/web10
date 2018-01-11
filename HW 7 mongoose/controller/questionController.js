const express= require('express');
const Router=express.Router();
const fs=require('./fileController');
const QuestionShema=require('../model/questionMode');
  


Router.post('/',(req,res)=>{


     if (req.body.send=="Gửi"){
         let newQuestion={
             question:req.body.question
         };

     QuestionShema.create(newQuestion,err=>{
         if (err) {console.log(err);}
         else{
             console.log('create successful');
             QuestionShema.findOne({question:req.body.question},'question yes no',function(err,ques){
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:ques.yes,
                    var4:ques.no 
                });   
             });
         }
     });
         
     }  
  
        
     if (req.body.NO=='no'){
        QuestionShema.findOneAndUpdate({question:req.body.question}, {$set:{no:1}},{new:true},function(err, ques){
                console.log('hi');
                console.log(ques); 
           });   
        };   

})

Router.get('/',(req,res)=>{
    
        QuestionShema.count().exec(function (err, count) {

        var random = Math.floor(Math.random() * count);
      
       
             QuestionShema.findOne().skip(random).exec(function (err, ques) 
                   {
                    res.render("questions",{
                        var1:ques.question,
                        var2:ques.yes+ques.no,
                        var3:ques.yes,
                        var4:ques.no 
                   });  
                   })
      })

      
})

 module.exports=Router;
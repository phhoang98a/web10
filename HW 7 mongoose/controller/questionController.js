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
                    var3:50,
                    var4:50, 
                });  
               console.log(ques.yes) ; 
             });
         }
     });
         
     }  
})

Router.post('/:name',(req,res)=>{
     
    

     if (req.body.NO=='no'){
        QuestionShema.findByIdAndUpdate(req.params.name, {$inc:{no:+1}},{upsert:true,'new':true},function(err, ques){
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no,
                var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
            });   
      });   
     };   

     
     if (req.body.YES=='yes'){
        QuestionShema.findByIdAndUpdate(req.params.name, {$inc:{yes:+1}},{upsert:true,'new':true},function(err, ques){
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no, 
                var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
            });   
      });   
     };  
     
     if (req.body.result=='Kết quả vote'){
        QuestionShema.findById(req.params.name,'question yes no',function(err, ques){
            if (ques.no+ques.yes==0)
            {
                res.render("questions",{
                    var1:ques.question,
                    var2:ques.yes+ques.no,
                    var3:50,
                    var4:50,
               });  
            }
            else{
            res.render("questions",{
                var1:ques.question,
                var2:ques.yes+ques.no,
                var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
            });  
        } 
      });   
     };  
})



Router.get('/',(req,res)=>{
    
        QuestionShema.count().exec(function (err, count) {

        var random = Math.floor(Math.random() * count);
      
       
             QuestionShema.findOne().skip(random).exec(function (err, ques) 
                   {
                    if (ques.yes+ques.no==0){
                        res.render("questions",{
                            var1:ques.question,
                            var2:ques.yes+ques.no,
                            var3:50,
                            var4:50,
                       });  
                    }   
                    else{
                    res.render("questions",{
                        var1:ques.question,
                        var2:ques.yes+ques.no,
                        var3:Math.round(100*ques.yes*100/(ques.yes+ques.no))/100,
                        var4:Math.round(100*ques.no*100/(ques.yes+ques.no))/100,
                   });  
                }
                   })
      })

      
})

 module.exports=Router;
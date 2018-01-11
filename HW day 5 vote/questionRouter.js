const express= require('express');
const Router=express.Router();
const fs=require('./fileController');
const question=require('./config.json');
  

Router.get('/:name',(req,res)=>{
    var n=req.params.name-1;
    res.render("questions",{
        var1:question[n].question,
        var2:question[n].yes+question[n].no,
        var3:question[n].yes,
        var4:question[n].no 
    });  
})

Router.post('/:name',(req,res)=>{
    var n=req.params.name-1;
    if (req.body.NO=='no'){ question[n].no++;}
    if (req.body.YES=='yes'){question[n].yes++;} 
    if (req.body.send=='Gửi'){
        question.push({"id":question.length+1,"question":req.body.question,"yes":0,"no":0});
    }
    fs.writeFile('config.json',JSON.stringify(question)); 
    res.render("questions",{
            var1:question[n].question,
            var2:question[n].yes+question[n].no,
            var3:question[n].yes,
            var4:question[n].no 
        });  
})

Router.get('/',(req,res)=>{
    var n=question.length-1;
    res.render("questions",{
            var1:question[n].question,
            var2:question[n].yes+question[n].no,
            var3:question[n].yes,
            var4:question[n].no 
    });
})

 module.exports=Router;
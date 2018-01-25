const express=require('express');
const bodyParser=require('body-parser');
const handlebars=require('express-handlebars');

let app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars",handlebars());
app.set("view engine","handlebars");

app.get('/api/:numberQuestion/:score/:addScore',(req,res)=>{
    var numberQuestion=Number(req.params.numberQuestion);
    var score=Number(req.params.score);
    var addScore=Number(req.params.addScore);
    console.log(numberQuestion,score,addScore);
    if (numberQuestion<6){
        res.send({
            score:score+addScore,
            numberQuestion:numberQuestion+1
        });
    }else{
        res.send({
            score:score+addScore,
            numberQuestion:0
        });
    }
})

app.get('/',(req,res)=>{
    res.render('anynumber');
})

app.use(express.static('public'));

app.listen(6969,(err)=>{
    if (err){
        console.log(err);
    }else{
        console.log('connect succcess');
    }    
})



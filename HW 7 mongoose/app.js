const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const fileController = require('./controller/questionController');
const questionController = require('./controller/questionController');
const voteController=require('./controller/voteController');
const mongoose=require('mongoose');



let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");


mongoose.connect("mongodb://localhost:27017/quyetde",(err)=>{
       if (err){
           console.log(err);
        }else{
           console.log("Database connect success!");
        }   
});


app.get('/', (req, res)=>{
    res.render("trangchu");
});

app.get('/ask', (req, res)=>{
    res.render("ask");
});

function random(a,b){
    return Math.floor(Math.random() * (b-a+1)) +a; 
}


app.use('/vote',voteController);
app.use('/questions',questionController);


app.listen(6969,(err)=>{
    if (err) {console.log(err);};
    console.log("App is listening at port 6969");
})
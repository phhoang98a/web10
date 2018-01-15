const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const voteRouter=require('./router/voteRouter');
const questionRouter=require('./router/questionRouter');
const questionAPIRouter=require('./router/questionAPIRouter');


let app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");


mongoose.connect("mongodb://localhost:27017/quyetde",(err)=>{
    if (err)
    {
        console.log(err);
    }else
    {
        console.log("Database connect success!");
    }   
});


app.get('/', (req, res)=>{
    res.render("trangchu");
});

app.get('/ask', (req, res)=>{
    res.render("ask");
});

app.use('/api/question',questionAPIRouter);
app.use('/vote',voteRouter);
app.use('/questions',questionRouter);
app.use(express.static('public'));

app.listen(6969,(err)=>{
    if (err){
        console.log(err);
    };
    console.log("App is listening at port 6969");
})
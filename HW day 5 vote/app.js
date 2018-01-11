const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const fileController = require('./fileController');
const questionRouter = require('./questionRouter');
const voteRouter = require('./voteRouter');
const question=require('./config.json');


let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");



app.get('/', (req, res)=>{
    res.render("trangchu");
});

app.get('/ask', (req, res)=>{
    res.render("ask",{
        variable:question.length+1
    });
});

function random(a,b){
    return Math.floor(Math.random() * (b-a+1)) +a; 
}

app.get('/vote', (req, res)=>{
    var n=random(1,question.length);  
    res.render("vote",{
        layout:"otherMain",
        variable1:question[n-1].question,
        variable2:String(question[n-1].id),
        variable3:question[n-1].yes,
        variable4:question[n-1].no
    });
});



app.use('/questions',questionRouter);


app.listen(6969,(err)=>{
    if (err) {console.log(err);};
    console.log("App is listening at port 6969");
})
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const seaRouter=require('./router/seaRouter');
const mountainRouter=require('./router/mountainRouter');
const detailRouter=require('./router/detailRouter');



let app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");



app.get('/', (req, res)=>{
    res.render("mainWeb");
});

app.get('/sea', (req, res)=>{
    res.render("seaWeb");
});


app.get('/mountain', (req, res)=>{
    res.render("mountainWeb");
});

app.use('/sea',seaRouter);
app.use('/mountain',mountainRouter);

app.use(express.static('public'));

app.listen(6969,(err)=>{
    if (err){
        console.log(err);
    };
    console.log("App is listening at port 6969");
})




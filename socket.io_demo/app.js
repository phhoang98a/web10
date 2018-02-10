const express=require('express');
const bodyParser=require('body-parser');
const handlebars=require('express-handlebars');
let app=express();
const server=require("http").Server(app);
var io = require('socket.io')(server);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars",handlebars());
app.set("view engine","handlebars");

app.get('/',(req,res)=>{
    res.render('main');
})

io.on('connection',(socket)=>{ 
    console.log("okie");
    socket.on('disconnect',()=>{
        console.log('out');
    })
    socket.on('Client-send-data',(data)=>{
        console.log(data);
        socket.broadcast.emit("Sever-send-data",data+"Guys");
    })
})

server.listen(6969,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log('connect success');
    }
});
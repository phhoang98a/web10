const express=require('express');
const app= express();

app.use(express.static('public'));

 app.get('/',(req, res)=>{
     res.sendFile(__dirname+"/public/about.html");
     
 })

 app.get('/CV',(req, res)=>{
    res.sendFile(__dirname+"/public/CV.html");
    
})

app.get('/Music',(req, res)=>{
    res.sendFile(__dirname+"/public/Music.html");
    
})


 app.listen(6969,(err)=>{
     if (err) {console.log(err);};
     console.log("App is listening at port 6969");
 })

 
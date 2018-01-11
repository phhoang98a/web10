const express= require('express');
const handlebars = require('express-handlebars');
const Router=express.Router();


let voteRouter=express();

voteRouter.set("view engine", "handlebars");


 module.exports=Router;
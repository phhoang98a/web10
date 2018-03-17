
const messageModel = require('../models/messageModel');

let loadMessages=function(sender,receiver,cb){
    messageModel.findOne({$and:[{'users.sender':sender},{'users.receiver':receiver}]},function(err,data){
        if (err){
            console.error(err);
        }else{
            cb(null,data);
        }
    })
}

let update=function(sender,receiver,messages,cb){
    messageModel.find( {$and:[{'users.sender':sender},{'users.receiver':receiver}]} ,function(err,data){
        if (err){
            console.error(err);
        }else{
            var data=data[0];
            if ( typeof data !== 'undefined' ) {
                messageModel.update({ _id: data._id },{$push:{"conversation":{messages:messages} }},{safe: true,upsert: true},(err,user)=>{
                   // cb(user);
                })
                
            }else{
                messageModel.create({
                    'users.sender':sender,
                    'users.receiver' :receiver,
                     conversation:[
                         {
                             messages:messages,
                             seen:false
                         }
                     ]
                },(err,user)=>{
                    if (err){
                        cb(err);
                    }else{
                       // cb(user);
                    }
                })
            }
        }
    })
}


module.exports = {
    loadMessages,
    update
}
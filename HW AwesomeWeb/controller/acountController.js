const AcountShema=require('../model/inputModel');



const checkUser=(username,callback)=>{
    AcountShema.count({user:username},(err,res)=>{
        if (err) {
            callback(err);
        }else{
            callback(null,res);
        }
    })
}

const checkEmail=(emailName,callback)=>{
    AcountShema.count({email:emailName},(err,res)=>{
        if (err) {
            callback(err);
        }else{
            callback(null,res);    
        }
    })
}

const update=(username,emailName)=>{
    AcountShema.create({user:username,email:emailName},(err,res)=>{
        if (err) console.log(err);
    })
}

module.exports={
    checkUser,
    checkEmail,
    update
}
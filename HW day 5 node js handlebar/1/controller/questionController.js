const QuestionShema=require('../model/questionMode');
  


const addQuestion=(question,callback)=>{
    QuestionShema.create({question},(err,res)=>{
         if (err){
             callback(err);
         }else{
             QuestionShema.findById(res._id,(err,ques)=>{
                if (err){
                    callback(err);
                }else{
                    callback(null,ques);
                }
             });
         }
    });
}

const updateVoteNo=(id,callback)=>{
    QuestionShema.findByIdAndUpdate(id,{$inc:{no:1}},{upsert:true,'new':true},(err,res)=>{
        if (err){
            callback(err);
        }else{
            callback(null,res);
        }
    });
}

const updateVoteYes=(id,callback)=>{
    QuestionShema.findByIdAndUpdate(id,{$inc:{yes:1}},{upsert:true,'new':true},(err,res)=>{
        if (err){
            callback(err);
        }else{
            callback(null,res);
        }
    });
}

const findQuesById=(id,callback)=>{
    QuestionShema.findById(id,(err,res)=>{
        if (err){
            callback(err);
        }else{
            callback(null,res);
        }
    });
}

const getRandomQues=(callback)=>{

    QuestionShema.count().exec(function(err,count){
          var random=Math.floor(Math.random()*count);
          QuestionShema.findOne().skip(random).exec(function(err,ques){
                if (err) {
                      callback(err);
                }else{
                      callback(null,ques);
                }
          })
    })
} 

module.exports={
    addQuestion,
    updateVoteNo,
    updateVoteYes,
    findQuesById,
    getRandomQues
}
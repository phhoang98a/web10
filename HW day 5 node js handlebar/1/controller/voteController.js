const QuestionShema=require('../model/questionMode');
  
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

module.exports={getRandomQues};
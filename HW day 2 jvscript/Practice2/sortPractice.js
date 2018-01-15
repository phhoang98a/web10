'use strict'

function sort(input) {
  var tg;  
  for (var i=0; i<=input.length-2;i++)
     for (var j=i+1;j<=input.length-1;j++)
       if (input[i]>input[j])
       {
         tg=input[i]; input[i]=input[j];input[j]=tg;
       } 
  return(input);     
}
module.exports = sort

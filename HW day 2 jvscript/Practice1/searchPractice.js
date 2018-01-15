
'use strict'

function search(input, target) {
      for (var i=0; i<=input.length-1;i++)
        if (input[i]==target) return i; 
      return -1;  
} 
module.exports = search

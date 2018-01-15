'use strict'
var seq = {
            data:[],
            addNumber : function(input, target, output){
                var item = {
                    input : input,
                    target : target,
                    output : output
                };
                this.data.push(item);
            }
          };


function random(a,b){
         return Math.floor(Math.random() * (b-a+1)) +a; 
}

function generate(numberOfTestcases, filePath = "./test-data.json"){
            var input=new Array();
            var target=random(-10000,10000); 
            var output=-1;
            seq.addNumber(input,target,output);
             
            if (numberOfTestcases==1) return seq.data;

            input= new Array();
            var index=random(1,500);
            for (let i=0; i<=index-1;i++) input[i]=random(-10000,10000);
            target=10000+random(1,10000); 
            output=-1;
            seq.addNumber(input,target,output);

            if (numberOfTestcases==2) return seq.data;

            input= new Array();
            var index=random(1,500);
            for (let i=0; i<=index-1;i++) input[i]=random(-10000,10000);
            target=input[0]; 
            output=0;
            seq.addNumber(input,target,output);

            if (numberOfTestcases==3) return seq.data;

            input= new Array();
            var index=random(1,500);
            for (let i=0; i<=index-1;i++) input[i]=random(-10000,10000);
            target=input[index-1]; 
            output=index-1;  
            seq.addNumber(input,target,output);

            if (numberOfTestcases==4) return seq.data;

            input= new Array();
            var index=random(1,500);
            for (let i=0; i<=index-1;i++) input[i]=random(-10000,10000);
            target=input[Math.floor(index/2)];
            output=Math.floor(index/2);
            seq.addNumber(input,target,output);

            if (numberOfTestcases==5) return seq.data;

            for (var j=1; j<=numberOfTestcases-5;j++)
            {
  
              input= new Array();
              var index=random(1,500);
              for (let i=0; i<=index-1;i++) input[i]=random(-10000,10000);
              var pos=random(0,index-1);
              target=random(-10000,10000);
              output=input.indexOf(target);
              seq.addNumber(input,target,output);              
            }

             return seq.data;
        
}

//console.log(generate(3,"./test-data.json"));

module.exports = generate

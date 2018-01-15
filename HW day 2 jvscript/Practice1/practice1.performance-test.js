'use strict';

require('util');
const performanceUtil = require('./performance-utils');
const fs = require('fs');
const path = require('path');
const outputFilePath = path.join(__dirname, process.argv[2] || 'test-data.json');

var tests = JSON.parse(fs.readFileSync(outputFilePath));
// performanceUtil.performanceTest(tests);

const RUN_TIMES = 1000;
var tindexOf = 0;
var tfind = 0;
var tforof = 0;
var tmanual = 0;
var tbinary = 0;
var tinterpolation = 0;

for(var i=0; i< RUN_TIMES; i++){
  if(i > 0){
    process.stdout.clearLine();
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  }
  process.stdout.write(`Running iteration no. ${i+1}/${RUN_TIMES}`);

  const result = performanceUtil.performanceTest(tests);
  tindexOf += result.tindexOf;
  tfind += result.tfind;
  tforof += result.tforof;
  tmanual += result.tmanual;
  tbinary += result.tbinary;
  tinterpolation += result.tinterpolation;
}
process.stdout.write('\n');

console.log("========");
console.log(`AVERAGE total time using indexOf             : ${(parseInt(tindexOf/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
console.log(`AVERAGE total time using find()              : ${(parseInt(tfind/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
console.log(`AVERAGE total time using every()             : ${(parseInt(tforof/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
console.log(`AVERAGE total time using for loop            : ${(parseInt(tmanual/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
console.log(`AVERAGE total time using binary search       : ${(parseInt(tbinary/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
console.log(`AVERAGE total time using interpolation search: ${(parseInt(tinterpolation/RUN_TIMES)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

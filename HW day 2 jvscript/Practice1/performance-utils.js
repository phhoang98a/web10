'use strict';

const performanceTest = function(tests){
  var tindexOf = process.hrtime();
  tests.forEach(testcase => {
    var result = testcase.input.indexOf(testcase.target);

    if(result !== testcase.output) console.log("Errr", result, testcase.output);
  });
  tindexOf = process.hrtime(tindexOf);
  // console.log(`Total time using indexOf             : ${(tindexOf[0] * 1e9 + tindexOf[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

  var tfind = process.hrtime();
  tests.forEach(testcase => {
    const result = testcase.input.findIndex(value => value === testcase.target);

    if(result !== testcase.output) console.log("Errr for of: ", result, testcase.output);
  });
  tfind = process.hrtime(tfind);
  // console.log(`Total time using findIndex()         : ${(tfind[0] * 1e9 + tfind[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

  var tforof = process.hrtime();
  tests.forEach(testcase => {
    var result = -1;
    testcase.input.every((value, index) => {
      if(value === testcase.target){
        result = index;
        return false;
      }
      return true;
    });

    if(result !== testcase.output) console.log("Errr for of: ", result, testcase.output);
  });
  tforof = process.hrtime(tforof);
  // console.log(`Total time using every()             : ${(tforof[0] * 1e9 + tforof[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

  var tmanual = process.hrtime();
  tests.forEach(testcase => {
    const arrLen = testcase.input.length;
    var result = -1;
    for(var i=0;i<arrLen;i++){
      if(testcase.input[i] === testcase.target){
        result = i;
        break;
      }
    }

    if(result !== testcase.output) console.log("Errr manual: ", result, testcase.output);
  });
  tmanual = process.hrtime(tmanual);
  // console.log(`Total time using for loop            : ${(tmanual[0] * 1e9 + tmanual[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

  var tbinary = process.hrtime();
  tests.forEach(testcase => {
    var max = testcase.input.length-1;
    var min = 0;
    var check, num;
    var result = -1;

    while(max >= min){
      check = Math.floor((max+min)/2);
      num = testcase.input[check];
      if(num === testcase.target){
        result = check;
        break;
      }
      else if(num > testcase.target) max = check-1;
      else min = check+1;
    }

    if(result !== testcase.output) console.log("Errr binary: ", result, testcase.output);
  });
  tbinary = process.hrtime(tbinary);
  // console.log(`Total time using binary search       : ${(tbinary[0] * 1e9 + tbinary[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

  var tinterpolation = process.hrtime();
  tests.forEach(testcase => {
    var max = testcase.input.length-1;
    var min = 0;
    var result = -1;
    var check, num;

    while(max > min && testcase.target >= testcase.input[min] && testcase.target <= testcase.input[max]){
      check = min +  Math.round((max-min) * (testcase.target - testcase.input[min]) / (testcase.input[max]-testcase.input[min]));
      num = testcase.input[check];

      if(num === testcase.target){
        result = check;
        break;
      }
      else if(testcase.target > num) min = check + 1;
      else max = check - 1;
    }

    if(result === -1 && testcase.input[max] == testcase.target) result = max;

    if(result !== testcase.output) console.log("Errr interpolation: ", result, testcase.output);
  });
  tinterpolation = process.hrtime(tinterpolation);
  // console.log(`Total time using interpolation search: ${(tinterpolation[0] * 1e9 + tinterpolation[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);
  // console.log("---");

  return {
    tindexOf        : tindexOf[0] * 1e9 + tindexOf[1],
    tfind           : tfind[0] * 1e9 + tfind[1],
    tforof          : tforof[0] * 1e9 + tforof[1],
    tmanual         : tmanual[0] * 1e9 + tmanual[1],
    tbinary         : tbinary[0] * 1e9 + tbinary[1],
    tinterpolation  : tinterpolation[0] * 1e9 + tinterpolation[1]
  }
}

module.exports = { performanceTest }

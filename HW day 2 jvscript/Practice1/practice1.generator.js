/*
 * USAGE: node practice1.generator.js <number_of_testcases> <output_file>
 */
'use strict';

require('util');
const fs = require('fs');
const path = require('path');

const AMOUNT_TO_GENERATE = parseInt(process.argv[2] || 1000);
const OUTPUT_FILE_PATH = path.join(__dirname, process.argv[3] || 'practice1-test-data.json');


// Make sure ARRAY_LENGTH_MAX < (MAX_NUMBER - MIN_NUMBER)
const ARRAY_LENGTH_MIN = 0;
const ARRAY_LENGTH_MAX = 500;
const MIN_NUMBER = -10000;
const MAX_NUMBER = 10000;

const TestType = {
  RANDOM        : 0,
  NOT_FOUND     : 1,
  RESULT_FIRST  : 2,
  RESULT_LAST   : 3,
  ZERO_LENGTH   : 4
}

const candidates = Array.from(Array(MAX_NUMBER - MIN_NUMBER + 1), (item, index) => MIN_NUMBER + index);

function randomInt(min, max){
  return Math.floor(Math.random()*(max - min)) + min;
}

function createNewTestcase(testType = TestType.RANDOM){
  if(testType === TestType.ZERO_LENGTH){
    return {
      input : [],
      target: randomInt(MIN_NUMBER, MAX_NUMBER),
      output: -1
    }
  }

  const lengthToGenerate = randomInt(ARRAY_LENGTH_MIN, ARRAY_LENGTH_MAX+2);
  const input = [];
  const sortedInput = [];

  for(var gen=0; gen < lengthToGenerate; gen++){
    var num = randomInt(MIN_NUMBER, MAX_NUMBER-gen);

    for(let sInput of sortedInput){
      if(num >= sInput) num++;
    }

    input.push(num);

    if(sortedInput.length === 0 || sortedInput[sortedInput.length-1] < num){
      sortedInput.push(num);
    }
    else{
      for(var i=0; i< sortedInput.length;i++){
        if(sortedInput[i] > num){
          sortedInput.splice(i,0,num);
          break;
        }
      }
    }
  }

  const notfound = input.length === lengthToGenerate ? input.splice(randomInt(0,input.length), 1)[0] : MIN_NUMBER-1;

  const output = getTestcaseOutput(testType, input);
  const target = output === -1 ? notfound : input[output];

  return {
    input,
    target,
    output
  }
}

function getTestcaseOutput(testType, input){
  switch (testType) {
    case TestType.NOT_FOUND:
      return -1;
      break;
    case TestType.RESULT_FIRST:
      return 0;
      break;
    case TestType.RESULT_LAST:
      return input.length-1;
      break;
    case TestType.RANDOM:
    default:
      return input.length > 0 ? randomInt(0, input.length) : -1;
      break;
  }
  return input.length > 0 ? randomInt(0, input.length) : -1;
}

var tgen = process.hrtime();
const tests = Array.from(Array(AMOUNT_TO_GENERATE > 4 ? AMOUNT_TO_GENERATE-4 : AMOUNT_TO_GENERATE), (item, index) => {
  if(index > 0){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  }
  process.stdout.write(`Generating test case no ${index+1}/${AMOUNT_TO_GENERATE}`);
  return createNewTestcase();
});
process.stdout.clearLine();
process.stdout.cursorTo(0);
process.stdout.write(`Generating test case no ${AMOUNT_TO_GENERATE}/${AMOUNT_TO_GENERATE}`);
if(AMOUNT_TO_GENERATE > 4){
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.NOT_FOUND));
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.RESULT_FIRST));
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.RESULT_LAST));
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.ZERO_LENGTH));
}
process.stdout.write('\n');

if(tests.length !== AMOUNT_TO_GENERATE) console.log("Error test length: ", tests.length, AMOUNT_TO_GENERATE);

fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(tests));
var tgen = process.hrtime(tgen);
console.log(`Generate time                        : ${(tgen[0] * 1e9 + tgen[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

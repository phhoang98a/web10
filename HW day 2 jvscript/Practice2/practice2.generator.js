/*
 * USAGE: node practice2.generator.js <number_of_testcases> <output_file>
 */
'use strict';

require('util');
const fs = require('fs');
const path = require('path');

const AMOUNT_TO_GENERATE = parseInt(process.argv[2] || 1000);
const OUTPUT_FILE_PATH = path.join(__dirname, process.argv[3] || 'practice2-test-data.json');


// Make sure ARRAY_LENGTH_MAX < (MAX_NUMBER - MIN_NUMBER)
const ARRAY_LENGTH_MIN = 0;
const ARRAY_LENGTH_MAX = 500;
const MIN_NUMBER = -10000;
const MAX_NUMBER = 10000;

const TestType = {
  RANDOM        : 0,
  ZERO_LENGTH   : 1,
  DUPLICATES    : 2,
  REVERSE       : 3
}

function randomInt(min, max){
  return Math.floor(Math.random()*(max - min)) + min;
}

function createNewTestcase(testType = TestType.RANDOM){
  if(testType === TestType.ZERO_LENGTH){
    return {
      input : [],
      output: []
    }
  }

  const lengthToGenerate = randomInt(ARRAY_LENGTH_MIN, ARRAY_LENGTH_MAX+2);

  var input = Array.from(
    Array(testType === TestType.DUPLICATES ? lengthToGenerate-2 : lengthToGenerate),
    item => randomInt(MIN_NUMBER, MAX_NUMBER+1)
  );

  if(testType === TestType.DUPLICATES){
    input.splice(randomInt(0, input.length), 0, input[randomInt(0, input.length)]);
    input.splice(randomInt(0, input.length), 0, input[randomInt(0, input.length)]);
  }

  const output = testType == TestType.REVERSE ? Array.from(input.sort((a,b) => a-b)) : Array.from(input).sort((a,b) => a-b);

  if(testType == TestType.REVERSE) input.reverse();

  return {
    input,
    output
  }
}

var tgen = process.hrtime();

const tests = Array.from(Array(AMOUNT_TO_GENERATE > 3 ? AMOUNT_TO_GENERATE-3 : AMOUNT_TO_GENERATE), (item, index) => {
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
if(AMOUNT_TO_GENERATE > 3){
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.ZERO_LENGTH));
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.DUPLICATES));
  tests.splice(randomInt(0, tests.length),0, createNewTestcase(TestType.REVERSE));
}
process.stdout.write('\n');

if(tests.length !== AMOUNT_TO_GENERATE) console.log("Error test length: ", tests.length, AMOUNT_TO_GENERATE);

fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(tests));
var tgen = process.hrtime(tgen);
console.log(`Generate time                        : ${(tgen[0] * 1e9 + tgen[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} nanoseconds`);

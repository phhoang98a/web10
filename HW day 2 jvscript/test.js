const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const fs = require('fs');

const Reporter = require('jasmine-spec-reporter').SpecReporter;
const customReporter = require('./customReporter');
jasmine.jasmine.getEnv().clearReporters();
jasmine.jasmine.getEnv().addReporter(new Reporter({
  spec : {
    displaySuccessful : false,
    displayPending: true,
    displayFailed: false
  }
}));
jasmine.jasmine.getEnv().addReporter(customReporter);

function randomInt(min, max){
  return Math.floor(Math.random()*(max - min)) + min;
}

var tests1 = require('./Practice1/practice1-test-data.json');
var tests2 = require('./Practice2/practice2-test-data.json');
var searchPractice = require('./Practice1/searchPractice');
var sortPractice = require('./Practice2/sortPractice');
var generatePractice = require('./Practice3/generatePractice');

console.log('Basic javascript test');

describe("search practice test", function() {
  tests1.forEach((testCase, index) => {
    it(`search test no. ${index}`, function() {
      var result = testCase.output;
      expect(searchPractice(testCase.input, testCase.target)).toEqual(result);
    });
  });
});

describe("sort practice test", function() {
  tests2.forEach((testCase, index) => {
    it(`sort test no. ${index}`, function() {
      var result = testCase.output;
      expect(sortPractice(testCase.input)).toEqual(result);
    });
  });
});

describe("generate practice test", function() {
    const length = randomInt(0, 500);
    const result = generatePractice(length);
    fs.writeFileSync("./Practice3/test-data.json", JSON.stringify(result),{encoding: "utf-8"});

    it(`generated data length must equal to length input`, function() {
      expect(result.length).toEqual(length);
    })
    if (result.length > 5) {
      it(`generated data must contain an input empty array`, function() {
        expect(result.find(e => e.input.length === 0)).not.toBeUndefined();
      });
      it(`generated data must contain an input with target not found`, function() {
        expect(result.find(e => e.input.indexOf(e.target) === -1)).not.toBeUndefined();
      });
      it(`generated data must contain target at index 0`, function() {
        expect(result.find(e => e.input[0] === e.target)).not.toBeUndefined();
      });
      it(`generated data must contain target at last index`, function() {
        expect(result.find(e => e.input[e.input.length - 1] === e.target)).not.toBeUndefined();
      });
      it(`generated data must contain target at middle`, function() {
        expect(result.find(e => e.input[Math.floor(e.input.length/2)] === e.target)).not.toBeUndefined();
      });
    }

    it(`generated data input length must less than 500`, function() {
      result.forEach(item => {
        expect(item.input.length <= 500).toBeTruthy();
      });
    });
    it(`generated output data must equal to index of target`, function() {
      result.forEach(item => {
        expect(item.input.indexOf(item.target)).toEqual(item.output);
      });
    });

    it(`generated output data must equal to data from the file`, function() {
      var outputFileData = fs.readFileSync("./Practice3/test-data.json", "utf-8");
      expect(JSON.stringify(result) === outputFileData).toBe(true);
    })
});

jasmine.execute();

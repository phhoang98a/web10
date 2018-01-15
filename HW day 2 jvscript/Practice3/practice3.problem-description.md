## Practice 3 - Generating test data for Practice 1

Write a function `generate`:

```javascript
function generate(numberOfTestcases){
  // Your code here
}
```

In this practice, you will create the generator that was used to create `practice1-test-data.json`. `numberOfTestcases` is the number of tests data that must be generated.

Your function's output must have the follow format:

```javascript
[
  {
    "input": [
      /*
       * A sorted array of length [0-500] containing unique integer numbers ranging from -10000 to 10000.
       * The array is sorted by ascending order, and number is distributed uniformly.
       */
    ],
    "target" : // a number to search for within the array.
    "output" : // expected result of Practice 1's search function (index of target within input)
  },
  ... // more test cases of the same format
]
```

Furthermore, if `numberOfTestcases` is 5 or more. Your returned test cases must have all of the following special cases:

 - *Zero-length*: `input` is an empty array `[]`.
 - *Not found*: `input` doesn't contain `target`.
 - *First index*: `target` is at index 0.
 - *Last index*: `target` is at index `input.length-1`.
 - *Middle index*: `target` is at index `Math.floor(input.length/2)`.

After you're done submit the folder to your git repository for evaluation.

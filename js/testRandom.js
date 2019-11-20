function generateRandomColourValue() {
  const randomColourValue = Math.floor(Math.random() * Math.floor(256));
  return randomColourValue;
}

const num = 1000;
const results = [];

for (let i = 0; i <= num; i++) {
  results.push(generateRandomColourValue());
}

// results.sort((a, b) => a - b);
console.log(results.indexOf(0));
console.log(results.indexOf(-1));
console.log(results.indexOf(100));
console.log(results.indexOf(255));
console.log(results.indexOf(256));
console.log(results.indexOf(500));
const fs = require("fs");
const os = require("os");
const path = require("path");

const textNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input.txt"));
  const input = buffer.toString();
  const lines = input.split(os.EOL);
  const answer = lines.reduce((accumulator, current) => {
    return accumulator + getCalibrationValue(current);
  }, 0);
  console.log(answer);
}

/**
 * @param {string} line
 * @returns {number}
 */
function getCalibrationValue(line) {
  const finalString = getFrontNumber(line) + getBackNumber(line);
  return parseInt(finalString);
}

/**
 * @param {string} line
 * @returns {string}
 */
function getFrontNumber(line) {
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (/\d/.test(char)) {
      return char;
    }
    for (let j = 0; j < textNumbers.length; j++) {
      const textNumber = textNumbers[j];
      if (line.substring(i, i + textNumber.length) === textNumber) {
        return String(j + 1);
      }
    }
  }
  return "0";
}

/**
 * @param {string} line
 * @returns {string}
 */
function getBackNumber(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line.charAt(i);
    if (/\d/.test(char)) {
      return char;
    }
    for (let j = 0; j < textNumbers.length; j++) {
      const textNumber = textNumbers[j];
      if (line.substring(i, i + textNumber.length) === textNumber) {
        return String(j + 1);
      }
    }
  }
  return "0";
}

if (require.main === module) {
  main();
}

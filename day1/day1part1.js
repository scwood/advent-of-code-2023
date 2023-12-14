const fs = require("fs");
const os = require("os");
const path = require("path");

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
  const digits = line.split("").filter((char) => /\d/.test(char));
  const finalString = digits[0] + digits[digits.length - 1];
  return parseInt(finalString);
}

if (require.main === module) {
  main();
}

const fs = require("fs");
const os = require("os");
const path = require("path");

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input.txt"));
  const input = buffer.toString();
  const lines = input.split(os.EOL);
  const chars = lines.map((line) => line.split(""));
  const answer = sumPartNumbers(chars);
  console.log(answer);
}

/**
 * @param {string[][]} chars
 * @returns {number}
 */
function sumPartNumbers(chars) {
  let total = 0;

  for (let y = 0; y < chars.length; y++) {
    const line = chars[y];
    let currentNumberString = "";
    let isValidNumber = false;

    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (isDigit(char)) {
        currentNumberString += char;
        isValidNumber = isValidNumber || isSymbolTouching(x, y, chars);
      } else {
        if (isValidNumber) {
          total += parseInt(currentNumberString);
        }
        currentNumberString = "";
        isValidNumber = false;
      }
    }

    if (isValidNumber) {
      total += parseInt(currentNumberString);
    }
  }

  return total;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string[][]} chars
 * @returns {boolean}
 */
function isSymbolTouching(x, y, chars) {
  return (
    isSymbol(chars[y - 1]?.[x - 1]) ||
    isSymbol(chars[y - 1]?.[x]) ||
    isSymbol(chars[y - 1]?.[x + 1]) ||
    isSymbol(chars[y]?.[x - 1]) ||
    isSymbol(chars[y]?.[x + 1]) ||
    isSymbol(chars[y + 1]?.[x - 1]) ||
    isSymbol(chars[y + 1]?.[x]) ||
    isSymbol(chars[y + 1]?.[x + 1])
  );
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isDigit(char) {
  return /\d/.test(char);
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isPeriod(char) {
  return char === ".";
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isSymbol(char) {
  return !!char && !isPeriod(char) && !isDigit(char);
}

if (require.main === module) {
  main();
}

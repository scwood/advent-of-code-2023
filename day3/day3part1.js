const fs = require("fs");
const os = require("os");
const path = require("path");

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input.txt"));
  const input = buffer.toString();
  const lines = input.split(os.EOL);
  const symbolMap = mapSymbols(lines);
  const potentialParts = mapNumbers(lines);
  const parts = potentialParts.filter((potentialPart) => {
    return isValidPart(potentialPart, symbolMap);
  });
  const answer = parts.reduce((accumulator, currentPart) => {
    return accumulator + currentPart.value;
  }, 0);
  console.log(answer);
}

/**
 * @param {string[]} lines
 * @returns {Record<number, Record<number, boolean>>}
 */
function mapSymbols(lines) {
  const result = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line.charAt(j);
      if (isPeriod(char) || isDigit(char)) {
        continue;
      }
      if (!result[i]) {
        result[i] = {};
      }
      result[i][j] = true;
    }
  }
  return result;
}

/**
 * @typedef {Object} NumberPosition
 * @property {number} value
 * @property {number[][]} coordinates
 */

/**
 * @param {string[]} lines
 * @returns {NumberPosition[]}
 */
function mapNumbers(lines) {
  const result = [];
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    let currentNumberString = "";
    let currentNumberCoordinates = [];
    for (let x = 0; x < line.length; x++) {
      const char = line.charAt(x);
      if (isDigit(char)) {
        currentNumberString += char;
        currentNumberCoordinates.push([x, y]);
      } else if (currentNumberString.length > 0) {
        result.push({
          value: parseInt(currentNumberString),
          coordinates: currentNumberCoordinates,
        });
        currentNumberString = [];
        currentNumberCoordinates = [];
      }
    }
    if (currentNumberString.length > 0) {
      result.push({
        value: parseInt(currentNumberString),
        coordinates: currentNumberCoordinates,
      });
    }
  }
  return result;
}

/**
 *
 * @param {NumberPosition} potentialPart
 * @param {Record<number, Record<number, boolean>>} symbolMap
 * @returns {boolean}
 */
function isValidPart(potentialPart, symbolMap) {
  for (let i = 0; i < potentialPart.coordinates.length; i++) {
    const [x, y] = potentialPart.coordinates[i];
    if (symbolMap[y - 1]?.[x] || symbolMap[y + 1]?.[x]) {
      return true;
    }
    if (i === 0) {
      if (
        symbolMap[y]?.[x - 1] ||
        symbolMap[y - 1]?.[x - 1] ||
        symbolMap[y + 1]?.[x - 1]
      ) {
        return true;
      }
    }
    if (i === potentialPart.coordinates.length - 1) {
      if (
        symbolMap[y]?.[x + 1] ||
        symbolMap[y - 1]?.[x + 1] ||
        symbolMap[y + 1]?.[x + 1]
      ) {
        return true;
      }
    }
  }
  return false;
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

if (require.main === module) {
  main();
}

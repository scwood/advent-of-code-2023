const fs = require("fs");
const os = require("os");
const path = require("path");

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input_small.txt"));
  const input = buffer.toString();
  const lines = input.split(os.EOL);
  const symbolMap = mapSymbols(lines);
  console.log(symbolMap);
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
      if (char === "." || isDigit(char)) {
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
 * @param {string} char
 * @returns {boolean}
 */
function isDigit(char) {
  return /\d/.test(char);
}

if (require.main === module) {
  main();
}

const fs = require("fs");
const os = require("os");
const path = require("path");

const colorCounts = {
  red: 12,
  green: 13,
  blue: 14,
};

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input.txt"));
  const input = buffer.toString();
  const games = input.split(os.EOL);
  const validGames = games.filter(isValidGame);
  const answer = sumGameIds(validGames);
  console.log(answer);
}

/**
 * @param {string} game
 * @returns {boolean}
 */
function isValidGame(game) {
  const [, gameLog] = game.split(": ");
  const rounds = gameLog.split("; ");

  for (const round of rounds) {
    const cubes = round.split(", ");
    for (const cube of cubes) {
      const [count, color] = cube.split(" ");
      if (parseInt(count) > colorCounts[color]) {
        return false;
      }
    }
  }

  return true;
}

/**
 *
 * @param {string[]} games
 * @returns {number}
 */
function sumGameIds(games) {
  return games.reduce((accumulator, game) => {
    const [info] = game.split(": ");
    const [, id] = info.split(" ");
    return accumulator + parseInt(id);
  }, 0);
}

if (require.main === module) {
  main();
}

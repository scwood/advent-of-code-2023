const fs = require("fs");
const os = require("os");
const path = require("path");

function main() {
  const buffer = fs.readFileSync(path.join(__dirname, "input.txt"));
  const input = buffer.toString();
  const games = input.split(os.EOL);
  const answer = games.reduce((accumulator, game) => {
    return accumulator + getPowerSet(game);
  }, 0);
  console.log(answer);
}

/**
 * @param {string} game
 * @returns {number}
 */
function getPowerSet(game) {
  const colorMaxes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const [, gameLog] = game.split(": ");
  const rounds = gameLog.split("; ");

  for (const round of rounds) {
    const cubes = round.split(", ");
    for (const cube of cubes) {
      const [count, color] = cube.split(" ");
      colorMaxes[color] = Math.max(colorMaxes[color], parseInt(count));
    }
  }

  return colorMaxes["red"] * colorMaxes["green"] * colorMaxes["blue"];
}

if (require.main === module) {
  main();
}

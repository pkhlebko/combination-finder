const Board = require('./board.class').Board;
const grillageData = require('./grillage.data');
const houseData = require('./house.data');

function echoСuttingChart(sections) {
  const sortedSections = sections.sort((a, b) => a.length - b.length).reverse();
  const boards = [];

  while (sortedSections.length > 0) {
    boards.push(Board.fillBoard(sortedSections, new Board()));
  }

  console.log(`You need ${boards.length} boards`);
  console.log(`Сutting chart`);
  boards.forEach(board => console.log(board.toString()));
}

// echoСuttingChart(grillageData);
echoСuttingChart(houseData);
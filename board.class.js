const boardLength = 6000;
const cutLength = 0;
const maxAdjustment = 0;

class Board {

  get residue() {
    return this._residue;
  }

  constructor(length = boardLength) {
    this._length = length;
    this._sections = [];
    this._effectiveLength = 0;
    this._residue = length;
  }

  pushSection(length) {
    this._sections.push(length);
    this._effectiveLength = this.getEffectiveLength();
    this._residue = this._length - this._effectiveLength;
  }

  toString() {
    const listOfSections = this._sections.reduce((acc, section) => `${acc} ${section}`, '');

    return `{${this._length}} => [${listOfSections} ] => (${this._residue})`
  }

  getEffectiveLength() {
    return this._sections.reduce((acc, section) => {
      const cut = acc === 0 ? 0 : cutLength;
      return acc + cut + section + maxAdjustment;
    }, 0);
  }

  static fillBoard(sections, board) {
    const newItem = sections.find(i => i.length <= board.residue);

    if (newItem) {
      board.pushSection(newItem.length);
      sections = Board.decreaseQuantity(sections, newItem);
      return Board.fillBoard(sections, board);
    }

    return board;
  }

  static decreaseQuantity(sections, item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      sections.splice(sections.indexOf(item), 1);
    }

    return sections;
  }

}

module.exports = {
  Board,
  boardLength,
  cutLength,
  maxAdjustment
}
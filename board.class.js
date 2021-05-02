const boardLength = 6020;
const cutLength = 5;
const maxAdjustment = 10;

class Board {

  constructor(length = boardLength) {
    this._length = length;
    this._sections = [];
    this._effectiveLength = undefined;
    this._residue = undefined;
  }

  pushSection(length) {
    const realLength = length + maxAdjustment + cutLength;

    if (this._residue >= realLength) {
      this._sections.push(length);
      this._effectiveLength = this.getEffectiveLength();
      this._residue = this._length - this._effectiveLength;
    } else {
      throw new Error(`Section length ${realLength} longer then residue ${this._residue}`);
    }
  }

  toString() {
    const listOfSections = this._sections.reduce((acc, section) => `${acc} ${section}`, '')();

    return `{${this._length}} => [${listOfSections}] => (${this._length - this.effectiveLength})`
  }

  getEffectiveLength() {
    return this._sections.reduce((acc, section) => {
      const cut = acc === 0 ? 0 : cutLength;
      return acc + cut + section + maxAdjustment;
    }, 0);
  }

}

module.exports = {
  Board,
  boardLength,
  cutLength,
  maxAdjustment
}
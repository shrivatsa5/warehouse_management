import { GeneralShape } from './generalShapeProperties';

class SquareModel extends GeneralShape {
  constructor(id, posX, posY, length, color, rotation) {
    super(id, 'Square', posX, posY, color, rotation);
    this.length = length;
  }

  handleDragStart() {}

  handleDragEnd() {}
}
module.exports = SquareModel;

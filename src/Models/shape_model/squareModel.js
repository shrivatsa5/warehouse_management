import GeneralShape from './generalShapeProperties';

class SquareModel extends GeneralShape {
  constructor(id, posX, posY, length, color, rotation) {
    super(id, 'square', posX, posY, color, rotation);
    this.length = length;
  }
}
export default SquareModel;

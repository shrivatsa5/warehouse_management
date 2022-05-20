import GeneralShape from './generalShapeProperties';

class RectangleModel extends GeneralShape {
  constructor(id, posX, posY, height, width, color, rotation) {
    super(id, 'rectangle', posX, posY, color, rotation);
    this.height = height;
    this.width = width;
  }
}
export default RectangleModel;

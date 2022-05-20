import GeneralShape from './generalShapeProperties';

class CircleModel extends GeneralShape {
  constructor(id, posX, posY, radius, color, rotation) {
    super(id, 'circle', posX, posY, color, rotation);
    this.radius = radius;
  }
}
export default CircleModel;

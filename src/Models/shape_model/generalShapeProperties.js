/**
 * Abstract Class Animal.
 *
 * @class GeneralShape
 */
class GeneralShape {
  constructor(id, shapeType, posX, posY, color, rotation, isDragging) {
    if (this.constructor == GeneralShape) {
      throw new Error('Abstract class cannot be instatiated');
    }

    this.id = id;
    this.shapeType = shapeType;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.rotation = rotation;
    this.isDragging = isDragging;
  }

  handleDragStart = (e) => {
    throw new Error('method must be implimented in subclass');
  };

  handleDragEnd = () => {
    throw new Error('method must be implimented in subclass');
  };
}

module.exports = GeneralShape;
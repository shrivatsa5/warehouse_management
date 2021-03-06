import GeneralShape from './generalShapeProperties';

class CircleModel extends GeneralShape {
  constructor(id, posX, posY, radius, color, rotation) {
    super(id, 'circle', posX, posY, color, rotation);
    this.radius = radius;
  }
  //below function calculates the color based on value
  getColorForPercentage(pct) {
    var percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
    ];

    for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break;
      }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
  }
  reCalcColor(value) {
    var color = this.getColorForPercentage(parseFloat(value));
    console.log('color isssss');
    console.log(color);
    this.color = color;
  }

  toJson() {
    return {
      id: this.id,
      posX: this.posX,
      posY: this.posY,
      radius: this.radius,
      color: this.color,
      rotation: this.rotation,
      shapeType: 'circle',
    };
  }

  static fromJson(jsonObj) {
    var cm = new CircleModel(
      jsonObj.id,
      jsonObj.posX,
      jsonObj.posY,
      jsonObj.radius,
      jsonObj.rotation
    );
    return cm;
  }
}
export default CircleModel;

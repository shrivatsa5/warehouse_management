class WarehouseBorder {
  constructor(shapeModle, actualArea) {
    this.shapeModel = shapeModle;
    this.skuList = [];
    this.ratio = this.calculateRatio(actualArea);
    console.log('ratio is');
    console.log(this.ratio);
  }
  calculateRatio(actualArea) {
    var ratio = 0;
    console.log('actual area');
    console.log(actualArea);
    if (this.shapeModel.shapeType == 'rectangle') {
      ratio =
        parseInt(actualArea) /
        (parseInt(this.shapeModel.height) * parseInt(this.shapeModel.width));
      return ratio;
    } else {
      var radius = parseInt(this.shapeModel.radius);
      ratio = parseInt(actualArea) / (3.14 * radius * radius);
      return ratio;
    }
  }

  addNewSkuToList(skuUnit) {
    this.skuList.push(skuUnit);
  }

  deleteSkuFromList() {}
}

module.exports = WarehouseBorder;

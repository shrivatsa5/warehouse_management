class WarehouseBorder {
  constructor(shapeModle) {
    this.shapeModel = shapeModle;
    this.skuList = [];
  }

  addNewSkuToList(skuUnit) {
    this.skuList.push(skuUnit);
  }

  deleteSkuFromList() {}
}

module.exports = WarehouseBorder;

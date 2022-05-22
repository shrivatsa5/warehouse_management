import RectangleModel from '../shape_model/rectangleModel';
import CircleModel from '../shape_model/circleModel';
import StorageUnit from './skuShapeModel';

class WarehouseBorder {
  constructor(shapeModle, actualArea, skuLists = []) {
    this.shapeModel = shapeModle;
    this.skuList = skuLists;
    this.ratio = this.calculateRatio(actualArea);
    this.actualArea = actualArea;
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

  //this below functions converts object data in to storable json format
  toJson() {
    var jsonObj = {};
    jsonObj['shapeModel'] = this.shapeModel.toJson();
    jsonObj['actualArea'] = this.actualArea;
    jsonObj['ratio'] = this.ratio;
    jsonObj['skuList'] = [];

    this.skuList.forEach((skuUnit) => {
      jsonObj['skuList'].push(skuUnit.toJson());
    });

    return jsonObj;
  }

  static fromJson(jsonObj) {
    //creating list of skuUnits

    console.log('consoleeee');
    console.log(jsonObj);
    var skuList = [];
    jsonObj.skuList.forEach((sku) => {
      skuList.push(StorageUnit.fromJson(sku, jsonObj.ratio));
    });

    return new WarehouseBorder(
      jsonObj.shapeModel.shapeType === 'rectangle'
        ? RectangleModel.fromJson(jsonObj.shapeModel)
        : CircleModel.fromJson(jsonObj.shapeModel),
      jsonObj.actualArea,
      skuList
    );
  }
}

export default WarehouseBorder;

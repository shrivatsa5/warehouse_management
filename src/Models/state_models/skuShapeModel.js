import RectangleModel from '../shape_model/rectangleModel';
import CircleModel from '../shape_model/circleModel';

class StorageUnit {
  constructor(shapeModel, unitname, ratio, volumeRemaining = null) {
    this.shapeModel = shapeModel;
    this.storageUnitName = unitname;
    this.totalVolume = this.getTotalVolumeForStorageUnit(ratio);
    console.log('total vol remaining');
    console.log(this.totalVolume);
    this.volumeRemainingEmpty =
      volumeRemaining == null ? this.totalVolume : volumeRemaining;

    //re calculating the color according to vaolumeRemainingEmpty and below function should called in when we modify volumeRemainingEmpty while consuming invoice
    this.shapeModel.reCalcColor(
      parseInt(this.volumeRemainingEmpty) / parseInt(this.totalVolume)
    );
  }
  getTotalVolumeForStorageUnit(ratio) {
    var totalVol = 0;
    if (this.shapeModel.shapeType === 'rectangle') {
      //storing the volume considering the ratio ( mapping it to real world )
      totalVol =
        parseInt(this.shapeModel.height) *
        parseInt(this.shapeModel.width) *
        3 *
        ratio; //3 because considering height is 3 feet
      return totalVol;
    } else {
      var radius = parseInt(this.shapeModel.radius);
      totalVol = 3.14 * radius * radius * 3 * ratio;
      return totalVol;
    }
  }

  consumeVolumeFromInvoice(volume, no_item) {
    this.volumeRemainingEmpty -= parseInt(volume) * parseInt(no_item);
    console.log('volume remaining');
    console.log(this.volumeRemainingEmpty);
    this.shapeModel.reCalcColor(
      parseInt(this.volumeRemainingEmpty) / parseInt(this.totalVolume)
    );
  }

  //below method converts data to storable json format
  toJson() {
    var jsonObj = {};
    jsonObj['shapeModel'] = this.shapeModel.toJson();
    jsonObj['storageUnitName'] = this.storageUnitName;
    jsonObj['totalVolume'] = this.totalVolume;
    jsonObj['volumeRemainingEmpty'] = this.volumeRemainingEmpty;
    return jsonObj;
  }

  static fromJson(jsonObj, ratio) {
    var stu = new StorageUnit(
      jsonObj.shapeModel.shapeType === 'rectangle'
        ? RectangleModel.fromJson(jsonObj.shapeModel)
        : CircleModel.fromJson(jsonObj.shapeModel),
      jsonObj.storageUnitName,
      ratio,
      jsonObj.volumeRemainingEmpty
    );
    return stu;
  }
}

export default StorageUnit;

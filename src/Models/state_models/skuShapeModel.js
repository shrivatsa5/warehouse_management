class StorageUnit {
  constructor(shapeModel, unitname, ratio) {
    this.shapeModel = shapeModel;
    this.storageUnitName = unitname;
    this.totalVolume = this.getTotalVolumeForStorageUnit(ratio);
    console.log('total vol remaining');
    console.log(this.totalVolume);
    this.volumeRemainingEmpty = this.totalVolume;

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
}

module.exports = StorageUnit;

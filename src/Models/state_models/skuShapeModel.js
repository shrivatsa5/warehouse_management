class StorageUnit {
  constructor(shapeModel, unitname) {
    this.shapeModel = shapeModel;
    this.storageUnitName = unitname;
    this.totalVolume = this.getTotalVolumeForStorageUnit();
    this.volumeRemainingEmpty = this.totalVolume;
  }
  getTotalVolumeForStorageUnit() { return this.shapeModel.height * this.shapeModel.width * 3;}
}

module.exports = StorageUnit;

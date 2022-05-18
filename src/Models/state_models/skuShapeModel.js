class StorageUnit {
  constructor(shapeModel, unitname) {
    this.shapeModel = shapeModel;
    this.storageUnitName = unitname;
    this.totalVolume = this.getTotalVolumeForStorageUnit();
    this.volumeRemainingEmpty = this.totalVolume;
  }
  getTotalVolumeForStorageUnit() {}
}

module.exports = StorageUnit;

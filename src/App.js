import './App.css';
import React from 'react';

import ModalComponent from './Components/modal';
import CanvasComponent from './Components/canvas';
import MenuCompponent from './Components/menuComponent';

import WarehouseBorder from './Models/state_models/outerShapeModels';
import StorageUnit from './Models/state_models/skuShapeModel';
import getShapeModel from './utilityFunctions';

class App extends React.Component {
  constructor() {
    super();

    //this is the place the retrieve the stored content
    var jsonObject =
      JSON.parse(localStorage.getItem('outerWareHouseObj')) || null;
    var outerWareHouseConstructedFromData = null;
    if (jsonObject != null) {
      outerWareHouseConstructedFromData = WarehouseBorder.fromJson(jsonObject);
      console.log('from local data');
      console.log(outerWareHouseConstructedFromData);
    }
    this.state = {
      height: 0,
      width: 0,
      isModalVisible: false,
      outerWareHouseObj: outerWareHouseConstructedFromData,
      skuUnit: null,

      //experimental
      shapeFormodal: 'rectangle',
      isCreatingWarehouseBorder: true,
    };

    //keeping track of all the shapes on which double click has been happened to delete in future when delete key is pressed
    this.selectedShapeIdsToDelete = [];

    //write a function which looks whether any stored outerWarehouse object available or not

    window.addEventListener('resize', this.update);

    this.showModalView = this.showModalView.bind(this);
    this.closeModalView = this.closeModalView.bind(this);
    this.createShapeOnCanvas = this.createShapeOnCanvas.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleInvoice = this.handleInvoice.bind(this);
  }

  componentDidMount() {
    this.update();
    document.addEventListener('keydown', this.handleDelete, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
    document.removeEventListener('keydown', this.handleDelete, false);
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth - 115,
    });
  };

  //below call back will be passed to button component as well Modal Component to show modals view
  showModalView(shapeFormodal) {
    if (this.state.outerWareHouseObj != null) {
      this.setState({
        isModalVisible: true,
        shapeFormodal: shapeFormodal,
        isCreatingWarehouseBorder: false,
      });
    } else {
      this.setState({
        isModalVisible: true,
        shapeFormodal: shapeFormodal,
      });
    }
  }

  handleInvoice(e) {
    e.preventDefault();
    console.log('invoice submitted');

    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = (e) => {
      let string_file = reader.result;
      console.log(string_file);
      let json_obj = JSON.parse(string_file);

      let skuListFromInvoice = json_obj.skuList;
      var outerWarehouseObjTemp = this.state.outerWareHouseObj;

      skuListFromInvoice.forEach((skuItemFromInvoioce) => {
        outerWarehouseObjTemp.skuList.forEach((sku_in_outerObj) => {
          if (
            sku_in_outerObj.storageUnitName ===
            skuItemFromInvoioce.storageUnitName
          ) {
            sku_in_outerObj.consumeVolumeFromInvoice(
              skuItemFromInvoioce.volume,
              1
            );
          }
        });
      });
      this.setState({
        outerWareHouseObj: outerWarehouseObjTemp,
      });
    };
    e.target.value = null;
  }

  //function is used to detect when delete key is pressed from keyboard and to delete konva object
  handleDelete(e) {
    if (e.key === 'Delete') {
      alert('Are You sure You want to delete the selected shapes ?');
      console.log(this.selectedShapeIdsToDelete);

      //first see whether outerwarehouseId exists in selectedshape
      if (
        this.selectedShapeIdsToDelete.includes(
          this.state.outerWareHouseObj.shapeModel.id.toString()
        )
      ) {
        this.setState({
          outerWareHouseObj: null,
        });
      } else {
        var outerWareHouseObjTemp = this.state.outerWareHouseObj;
        outerWareHouseObjTemp.skuList = outerWareHouseObjTemp.skuList.filter(
          (skuUnit) => {
            return (
              this.selectedShapeIdsToDelete.includes(skuUnit.shapeModel.id) ===
              false
            );
          }
        );
        this.setState({
          outerWareHouseObj: outerWareHouseObjTemp,
        });
      }
    }
  }

  handleSave() {
    console.log(this.state.outerWareHouseObj);
    if (this.state.outerWareHouseObj == null) {
      localStorage.setItem('outerWareHouseObj', null);
    } else {
      localStorage.setItem(
        'outerWareHouseObj',
        JSON.stringify(this.state.outerWareHouseObj.toJson())
      );
    }
  }

  closeModalView() {
    this.setState({
      isModalVisible: false,
    });
  }

  //
  handleDragStart(e) {
    console.log('dragging started..');
    const id = e.target.id();
    var outerWareHouseObjTemp = this.state.outerWareHouseObj;
    if (id === outerWareHouseObjTemp.shapeModel.id) {
      // we are dragging the outerwarehouseObj
      outerWareHouseObjTemp.shapeModel.isDragging = true;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    } else {
      //we are dragging inner SKUs
      var innerSkuLists = outerWareHouseObjTemp.skuList;
      innerSkuLists = innerSkuLists.map((skuUnit) => {
        if (id === skuUnit.shapeModel.id) {
          skuUnit.shapeModel.isDragging = true;
        }
        return skuUnit;
      });
      outerWareHouseObjTemp.skuList = innerSkuLists;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    }
  }
  handleDragEnd(e) {
    const id = e.target.id();
    console.log('dragging ended');
    console.log(e.target.id());

    var outerWareHouseObjTemp = this.state.outerWareHouseObj;
    if (id === outerWareHouseObjTemp.shapeModel.id) {
      // we are dragging the outerwarehouseObj

      outerWareHouseObjTemp.shapeModel.isDragging = false;
      outerWareHouseObjTemp.shapeModel.posX = e.currentTarget.getX();
      outerWareHouseObjTemp.shapeModel.posY = e.currentTarget.getY();

      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
      console.log('dragging ended..');

      console.log('printing latest x and y pos');
      console.log(
        this.state.outerWareHouseObj.shapeModel.posX,
        this.state.outerWareHouseObj.shapeModel.posY
      );
    } else {
      //we are dragging inner SKUs
      console.log('we started dragging innerskus');
      console.log(id);
      var innerSkuLists = outerWareHouseObjTemp.skuList;
      innerSkuLists = innerSkuLists.map((skuUnit) => {
        if (id === skuUnit.shapeModel.id) {
          skuUnit.shapeModel.isDragging = false;
          skuUnit.shapeModel.posX = e.currentTarget.getX();
          skuUnit.shapeModel.posY = e.currentTarget.getY();
          console.log('printing latest x and y pos');
          console.log(skuUnit.shapeModel.posX, skuUnit.shapeModel.posY);
        }
        return skuUnit;
      });
      outerWareHouseObjTemp.skuList = innerSkuLists;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    }
  }

  //onDoubleClick shape with that id will get in to selected shape and when delete key is pressed those shape will be deleted
  handleDoubleClick(e) {
    const id = e.target.id();
    console.log(id);
    if (
      this.state.outerWareHouseObj.shapeModel.id == id &&
      this.state.outerWareHouseObj.skuList.lenth > 0
    ) {
      console.log('first delete all the inner skus to delete outerwareHouse');
    } else if (this.state.outerWareHouseObj.shapeModel.id == id) {
      this.selectedShapeIdsToDelete.push(id);
    } else {
      for (var index in this.state.outerWareHouseObj.skuList) {
        var skuUnit = this.state.outerWareHouseObj.skuList[index];
        console.log(skuUnit);
        if (skuUnit.shapeModel.id == id) {
          if (this.selectedShapeIdsToDelete.includes(id)) {
            console.log('already present in the list');
          } else {
            this.selectedShapeIdsToDelete.push(id);
          }
        }
      }
    }
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas(infoFromModalInputs) {
    //below line closes the modal
    this.closeModalView();

    console.log(infoFromModalInputs);

    if (!this.state.outerWareHouseObj) {
      console.log('outer warehouse not designed');
      var shapeModel = getShapeModel({
        shapeType: infoFromModalInputs.shapeType,
        length: infoFromModalInputs.length,
        width: infoFromModalInputs.width,
        radius: infoFromModalInputs.radius,
        state: this.state,
        isForWareHouseBorder: true,
      });

      var outerWareHouseObjTemp = new WarehouseBorder(
        shapeModel,
        infoFromModalInputs.area
      );
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    } else {
      console.log('warehouse is created already. append this sku to it');
      var shapeModel = getShapeModel({
        shapeType: infoFromModalInputs.shapeType,
        length: infoFromModalInputs.length,
        width: infoFromModalInputs.width,
        radius: infoFromModalInputs.radius,
        state: this.state,
        isForWareHouseBorder: false,
      });
      var skuUnit = new StorageUnit(
        shapeModel,
        infoFromModalInputs.item,
        this.state.outerWareHouseObj.ratio
      );
      var outerWarehouseObjTemp = this.state.outerWareHouseObj;
      outerWarehouseObjTemp.skuList.push(skuUnit);
      this.setState({
        outerWareHouseObj: outerWarehouseObjTemp,
      });
    }
  }

  render() {
    return (
      <>
        <div className='wrap'>
          <div className='floatleft'>
            <CanvasComponent
              state={this.state}
              handleDragStart={this.handleDragStart}
              handleDragEnd={this.handleDragEnd}
              handleDoubleClick={this.handleDoubleClick}
            />
          </div>
          <MenuCompponent
            handleSave={this.handleSave}
            showModalView={this.showModalView}
            handleInvoice={this.handleInvoice}
          />
        </div>

        <ModalComponent
          callbackFn={this.createShapeOnCanvas}
          shapeType={this.state.shapeFormodal}
          isModalVisible={this.state.isModalVisible}
          isCreatingWareHouse={this.state.isCreatingWarehouseBorder}
        />
      </>
    );
  }
}
export default App;

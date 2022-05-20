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

    this.state = {
      height: 0,
      width: 0,
      isModalVisible: false,
      outerWareHouseObj: null,
      skuUnit: null,

      //experimental
      shapeFormodal: 'rectangle',
      isCreatingWarehouseBorder: true,
    };

    //write a function which looks whether any stored outerWarehouse object available or not

    window.addEventListener('resize', this.update);

    this.showModalView = this.showModalView.bind(this);
    this.closeModalView = this.closeModalView.bind(this);
    this.createShapeOnCanvas = this.createShapeOnCanvas.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  //below call back will be passed to button component as well Modal Component to show modals view
  showModalView(shapeFormodal) {
    if (this.state.outerWareHouseObj) {
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
    console.log('dragging ended..');
    const id = e.target.id();
    var outerWareHouseObjTemp = this.state.outerWareHouseObj;
    if (id === outerWareHouseObjTemp.shapeModel.id) {
      // we are dragging the outerwarehouseObj
      outerWareHouseObjTemp.shapeModel.isDragging = false;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    } else {
      //we are dragging inner SKUs
      var innerSkuLists = outerWareHouseObjTemp.skuList;
      innerSkuLists = innerSkuLists.map((skuUnit) => {
        if (id === skuUnit.shapeModel.id) {
          skuUnit.shapeModel.isDragging = false;
        }
        return skuUnit;
      });
      outerWareHouseObjTemp.skuList = innerSkuLists;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    }
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas(infoFromModalInputs) {
    this.closeModalView();
    if (!this.state.outerWareHouseObj) {
      console.log('outer warehouse not designed');
      console.log(infoFromModalInputs);
      var shapeModel = getShapeModel({
        shapeType: infoFromModalInputs.shapeType,
        length: infoFromModalInputs.length,
        width: infoFromModalInputs.width,
        radius: infoFromModalInputs.radius,
        state: this.state,
      });
      var outerWareHouseObjTemp = new WarehouseBorder(shapeModel);
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp,
      });
    } else {
      console.log('warehouse is created already. append this sku to it');
      console.log(infoFromModalInputs.shapeType);
      var skuUnit = new StorageUnit(infoFromModalInputs.shapeType, 'biscuit');
      var outerWarehouseObjTemp = this.state.outerWareHouseObj;
      outerWarehouseObjTemp.addNewSkuToList(skuUnit);
      this.setState({
        outerWareHouseObj: outerWarehouseObjTemp,
      });
    }
  }

  render() {
    return (
      <div className='wrap'>
        <ModalComponent
          callbackFn={this.createShapeOnCanvas}
          shapeType={this.state.shapeFormodal}
          isModalVisible={this.state.isModalVisible}
          isCreatingWareHouse={this.state.isCreatingWarehouseBorder}
        />
        <div className='floatleft'>
          <CanvasComponent
            state={this.state}
            handleDragStart={this.handleDragStart}
            handleDragEnd={this.handleDragEnd}
          />
        </div>
        <div className='floatright'>
          <MenuCompponent showModalView={this.showModalView} />
        </div>
      </div>
    );
  }
}
export default App;

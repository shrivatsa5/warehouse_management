import "./App.css";
import React from "react";

import ModalComponent from "./Components/modal";
import CanvasComponent from "./Components/canvas";
import MenuCompponent from "./Components/menuComponent";

import WarehouseBorder from "./Models/state_models/outerShapeModels";
import StorageUnit from "./Models/state_models/skuShapeModel";
import getShapeModel from "./utilityFunctions";

class App extends React.Component {
  constructor() {
    super();
    var outerWareHouseObjLocal =
      JSON.parse(localStorage.getItem("outerWareHouseObj")) || null;
    console.log("from Local storage");
    if (outerWareHouseObjLocal)
      console.log(
        outerWareHouseObjLocal.shapeModel.posX,
        outerWareHouseObjLocal.shapeModel.posY
      );
    this.state = {
      height: 0,
      width: 0,
      isModalVisible: false,
      outerWareHouseObj: outerWareHouseObjLocal,
      skuUnit: null,

      //experimental
      shapeFormodal: "rectangle",
      isCreatingWarehouseBorder: true
    };

    //write a function which looks whether any stored outerWarehouse object available or not

    window.addEventListener("resize", this.update);

    this.showModalView = this.showModalView.bind(this);
    this.closeModalView = this.closeModalView.bind(this);
    this.createShapeOnCanvas = this.createShapeOnCanvas.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.update);
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  //below call back will be passed to button component as well Modal Component to show modals view
  showModalView(shapeFormodal) {
    if (this.state.outerWareHouseObj) {
      this.setState({
        isModalVisible: true,
        shapeFormodal: shapeFormodal,
        isCreatingWarehouseBorder: false
      });
    } else {
      this.setState({
        isModalVisible: true,
        shapeFormodal: shapeFormodal
      });
    }
  }

  handleSave() {
    console.log("save button clicked");
    console.log(
      this.state.outerWareHouseObj.shapeModel.posX,
      this.state.outerWareHouseObj.shapeModel.posY
    );
    localStorage.setItem(
      "outerWareHouseObj",
      JSON.stringify(this.state.outerWareHouseObj)
    );
  }

  closeModalView() {
    this.setState({
      isModalVisible: false
    });
  }

  //
  handleDragStart(e) {
    console.log("dragging started..");
    const id = e.target.id();
    var outerWareHouseObjTemp = this.state.outerWareHouseObj;
    if (id === outerWareHouseObjTemp.shapeModel.id) {
      // we are dragging the outerwarehouseObj
      outerWareHouseObjTemp.shapeModel.isDragging = true;
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp
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
        outerWareHouseObj: outerWareHouseObjTemp
      });
    }
  }
  handleDragEnd(e) {
    const id = e.target.id();
    //console.log(e.currentTarget.getX());

    var outerWareHouseObjTemp = this.state.outerWareHouseObj;
    if (id === outerWareHouseObjTemp.shapeModel.id) {
      // we are dragging the outerwarehouseObj

      outerWareHouseObjTemp.shapeModel.isDragging = false;
      outerWareHouseObjTemp.shapeModel.posX= e.currentTarget.getX();
      outerWareHouseObjTemp.shapeModel.posY= e.currentTarget.getY();

      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp
      });
      console.log("dragging ended..");
      console.log(
        this.state.outerWareHouseObj.shapeModel.posX,
        this.state.outerWareHouseObj.shapeModel.posY
      );
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
        outerWareHouseObj: outerWareHouseObjTemp
      });
    }
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas(infoFromModalInputs) {
    //below line closes the modal
    this.closeModalView();

    if (!this.state.outerWareHouseObj) {
      console.log("outer warehouse not designed");
      console.log(infoFromModalInputs);

      var shapeModel = getShapeModel({
        shapeType: infoFromModalInputs.shapeType,
        length: infoFromModalInputs.length,
        width: infoFromModalInputs.width,
        radius: infoFromModalInputs.radius,
        state: this.state,
        isForWareHouseBorder: true,
<<<<<<< HEAD
       
=======
>>>>>>> 075ac1fd1bc1ee0f0ebbb44567fd408d61b8d2df
      });

      var outerWareHouseObjTemp = new WarehouseBorder(shapeModel);
      this.setState({
        outerWareHouseObj: outerWareHouseObjTemp
      });
    } else {
<<<<<<< HEAD
      console.log("warehouse is created already. append this sku to it");
=======
      console.log('warehouse is created already. append this sku to it');
      console.log();
>>>>>>> 075ac1fd1bc1ee0f0ebbb44567fd408d61b8d2df
      var shapeModel = getShapeModel({
        shapeType: infoFromModalInputs.shapeType,
        length: infoFromModalInputs.length,
        width: infoFromModalInputs.width,
        radius: infoFromModalInputs.radius,
        state: this.state,
        isForWareHouseBorder: false,
<<<<<<< HEAD
       
        
      });
      var skuUnit = new StorageUnit(shapeModel, infoFromModalInputs.item);
      console.log(skuUnit)
=======
      });
      var skuUnit = new StorageUnit(shapeModel, 'biscuit');
>>>>>>> 075ac1fd1bc1ee0f0ebbb44567fd408d61b8d2df
      var outerWarehouseObjTemp = this.state.outerWareHouseObj;
      outerWarehouseObjTemp.addNewSkuToList(skuUnit);
      this.setState({
        outerWareHouseObj: outerWarehouseObjTemp
      });
    }
  }

  render() {
    return (
      
      <div className="wrap">
        <div>
          
        </div>

        <ModalComponent
          callbackFn={this.createShapeOnCanvas}
          shapeType={this.state.shapeFormodal}
          isModalVisible={this.state.isModalVisible}
          isCreatingWareHouse={this.state.isCreatingWarehouseBorder}
        />
        <div className="floatleft">
          <CanvasComponent
            state={this.state}
            handleDragStart={this.handleDragStart}
            handleDragEnd={this.handleDragEnd}
          />
        </div>
        <div className="floatright">
          <MenuCompponent
            handleSave={this.handleSave}
            showModalView={this.showModalView}
          />
        </div>
      </div>
    );
  }
}
export default App;

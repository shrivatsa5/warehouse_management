import "./App.css";
import { Stage, Layer, Text, Circle } from "react-konva";
import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import ModalComponent from "./Components/modal";
import WarehouseBorder from "./Models/state_models/outerShapeModels";
import StorageUnit from "./Models/state_models/skuShapeModel";
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
      shapeFormodal: "rectangle"
    };

    //write a function which looks whether any stored outerWarehouse object available or not

    window.addEventListener("resize", this.update);

    this.toggleModalView = this.toggleModalView.bind(this);
    this.createShapeOnCanvas = this.createShapeOnCanvas.bind(this);
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

  //below call back will be passed to button component as well Modal Component to toggle modals view
  toggleModalView(shapeFormodal) {
    console.log(shapeFormodal);
    this.setState({
      isModalVisible: this.state.isModalVisible === true ? false : true,
      shapeFormodal: shapeFormodal
    });
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas(props) {
    console.log("this callback function creates shape");
    console.log(props.state.length);
    if (!this.state.outerWareHouseObj) {
      console.log("outer warehouse not designed");
      console.log(props.state.shapeType);
      this.state.outerWareHouseObj = new WarehouseBorder(props.state.shapeType);
    } else {
      console.log("warehouse is created already. append this sku to it");
      console.log(props.state.shapeType);
      this.skuUnit = new StorageUnit(props.state.shapeType, "biscuit");
      this.skuUnit.totalVolume = this.skuUnit.getTotalVolumeForStorageUnit();
    }

    this.setState({
      isModalVisible: this.state.isModalVisible === true ? false : true
    });
  }

  render() {
    return (
      <div>
        {this.state.isModalVisible == true ? (
          <ModalComponent
            callbackFn={this.createShapeOnCanvas.bind(this)}
            shapeType={this.state.shapeFormodal}
            isModalVisible={this.state.isModalVisible}
          />
        ) : null}
        <div className="floatleft">
          <Stage
            width={this.state.height}
            height={this.state.width}
            style={{
              backgroundColor: "pink",
              borderRadius: "15px",
              overflow: "hidden"
            }}
          >
            <Layer></Layer>
          </Stage>
        </div>
        <div className="floatright">
          <div>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              orientation="vertical"
            >
              <Button
                onClick={(e) => {
                  this.toggleModalView("square");
                }}
              >
                Square
              </Button>
              <Button
                onClick={(e) => {
                  this.toggleModalView("rectangle");
                }}
              >
                Rectangle
              </Button>
              <Button
                onClick={(e) => {
                  this.toggleModalView("circle");
                }}
              >
                Circle
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

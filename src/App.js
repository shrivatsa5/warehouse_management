import './App.css';
import { Stage, Layer, Text, Rect } from 'react-konva';
import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ModalComponent from './Components/modal';
import WarehouseBorder from './Models/state_models/outerShapeModels';
import StorageUnit from './Models/state_models/skuShapeModel';
import RectangleModel from './Models/shape_model/rectangleModel';

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

  //function takes shapeType and returns shapeModel
  getShapeModel(infoFromModalInputs) {
    var MAX_RANGE = 10000;

    if (infoFromModalInputs.shapeType === 'rectangle') {
      console.log(typeof infoFromModalInputs.length);
      return new RectangleModel(
        Math.random() * MAX_RANGE,
        Math.random() * this.state.width,
        Math.random() * this.state.height,
        infoFromModalInputs.length,
        infoFromModalInputs.width,
        'orange'
      );
    }
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas(infoFromModalInputs) {
    this.closeModalView();
    if (!this.state.outerWareHouseObj) {
      console.log('outer warehouse not designed');
      console.log(infoFromModalInputs);
      var shapeModel = this.getShapeModel(infoFromModalInputs);
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
      <div>
        <ModalComponent
          callbackFn={this.createShapeOnCanvas}
          shapeType={this.state.shapeFormodal}
          isModalVisible={this.state.isModalVisible}
          isCreatingWareHouse={this.state.isCreatingWarehouseBorder}
        />

        <div className='floatleft'>
          <Stage
            width={this.state.height}
            height={this.state.width}
            style={{
              backgroundColor: 'pink',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
          >
            <Layer>
              {this.state.outerWareHouseObj != null ? (
                <Rect
                  x={100}
                  y={100}
                  width={parseInt(
                    this.state.outerWareHouseObj.shapeModel.width
                  )}
                  height={parseInt(
                    this.state.outerWareHouseObj.shapeModel.height
                  )}
                  fill='red'
                  shadowBlur={10}
                />
              ) : null}
            </Layer>
          </Stage>
        </div>
        <div className='floatright'>
          <div>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
              orientation='vertical'
            >
              <Button
                onClick={(e) => {
                  this.showModalView('square');
                }}
              >
                Square
              </Button>
              <Button
                onClick={(e) => {
                  this.showModalView('rectangle');
                }}
              >
                Rectangle
              </Button>
              <Button
                onClick={(e) => {
                  this.showModalView('circle');
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

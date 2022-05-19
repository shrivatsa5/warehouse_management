import './App.css';
import { Stage, Layer, Text, Circle } from 'react-konva';
import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ModalComponent from './Components/modal';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      height: 0,
      width: 0,
      isModalVisible: false,
      outerWareHouseObj: null,

      //experimental
      shapeFormodal: 'rectangle',
    };

    //write a function which looks whether any stored outerWarehouse object available or not

    window.addEventListener('resize', this.update);

    this.toggleModalView = this.toggleModalView.bind(this);
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

  //below call back will be passed to button component as well Modal Component to toggle modals view
  toggleModalView(shapeFormodal) {
    console.log(this, shapeFormodal);

    if (this.state.isModalVisible) {
      console.log('modal is open and will close it now');
      this.setState({
        isModalVisible: false,
      });
    } else {
      console.log('modal is currently closed, opening now');
      this.setState({
        isModalVisible: true,
        shapeFormodal: shapeFormodal,
      });
    }
  }

  //below function will be passed as a callback to Modal component and will add either outerWareHouse object or inner SKU
  createShapeOnCanvas() {
    console.log('this callback function creates shape');
    console.log(this);

    //first check whether outerWarehouse object in this.state is null or not
    //if null create outerWareHouse Object
    //else create Storageunit and add it to OuterWareHouse
    this.toggleModalView();
  }

  render() {
    return (
      <div>
        <ModalComponent
          callbackFn={this.createShapeOnCanvas}
          shapeType={this.state.shapeFormodal}
          isModalVisible={this.state.isModalVisible}
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
            <Layer></Layer>
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
                  this.toggleModalView('square');
                }}
              >
                Square
              </Button>
              <Button>Rectangle</Button>
              <Button>Circle</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

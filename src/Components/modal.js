import React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      width: 0,
      radius: 0,
      item: '',
      area: 0,
    };

    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleModalSubmit(e) {
    e.preventDefault();

    //TODO - need to find way to pass only props.shapeType
    var infoToSend = { ...this.state, ...this.props };
    this.props.callbackFn(infoToSend);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState((prevState) => {
      if (name === 'length') {
        return {
          width: prevState.width,
          radius: prevState.radius,
          length: value,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible,
          area: prevState.area,
        };
      } else if (name === 'width') {
        return {
          width: value,
          radius: prevState.radius,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible,
          item: prevState.item,
          area: prevState.area,
        };
      } else if (name === 'radius') {
        return {
          width: prevState.width,
          radius: value,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible,
          item: prevState.item,
          area: prevState.area,
        };
      } else if (name === 'item') {
        return {
          width: prevState.width,
          radius: prevState.radius,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible,
          item: value,
          area: prevState.area,
        };
      } else {
        return {
          width: prevState.width,
          radius: prevState.radius,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible,
          item: prevState.item,
          area: value,
        };
      }
    });
  }

  render() {
    const style = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '3px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const ariaLabel = { 'aria-label': 'description' };
    return (
      <div>
        <Modal
          open={this.props.isModalVisible}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: 'background.paper',
              border: '3px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={this.handleModalSubmit}>
              <div>
                {this.props.shapeType === 'circle' && (
                  <div>
                    <label>
                      Radius:
                      <div>
                        <input
                          type='number'
                          name='radius'
                          value={this.state.radius}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
                {(this.props.shapeType === 'square' ||
                  this.props.shapeType === 'rectangle') && (
                  <div>
                    <label>
                      Length
                      <div>
                        <input
                          type='number'
                          name='length'
                          value={this.state.length}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
                {this.props.shapeType === 'rectangle' && (
                  <div>
                    <label>
                      Width:
                      <div>
                        <input
                          type='number'
                          name='width'
                          value={this.state.width}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
              </div>
              <br></br>
              {this.props.isCreatingWareHouse ? (
                <div>
                  <label>
                    Actual Area:
                    <div>
                      <input
                        type='number'
                        name='Actual Area'
                        value={this.state.area}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>
              ) : (
                <div>
                  <label>
                    Item:
                    <div>
                      <input
                        type='text'
                        name='item'
                        value={this.state.item}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>
              )}
              <br></br>
              <button>Submit</button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}
export default ModalComponent;

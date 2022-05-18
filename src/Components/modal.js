import React from 'react';
import { Modal, Box, Input, Button } from '@material-ui/core';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.length = null;
    this.width = null;
    this.radius = null;
    this.shapeType = props.shapeType;
    this.callbackFn = props.callbackFn;
    this.isModalVisible = props.isModalVisible;

    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    console.log(this.shapeType);
  }

  handleModalSubmit(e) {
    e.preventDefault();

    this.callbackFn();
  }

  render() {
    const ariaLabel = { 'aria-label': 'description' };

    return (
      <div>
        <Modal
          open={true}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box>
            <Input defaultValue='Hello world' inputProps={ariaLabel} />
            <Button onClick={this.handleModalSubmit}>Submit</Button>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;

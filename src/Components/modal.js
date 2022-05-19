import React from 'react';
import { Modal, Box, Input, Button } from '@material-ui/core';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: null,
      width: null,
      radius: null,
    };

    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    console.log('creating modal ', this.isModalVisible);
  }

  handleModalSubmit(e) {
    e.preventDefault();

    this.props.callbackFn();
  }

  render() {
    const ariaLabel = { 'aria-label': 'description' };

    return (
      <div>
        <Modal
          open={this.props.isModalVisible}
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

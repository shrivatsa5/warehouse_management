import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: "",
      width: "",
      radius: "",
      shapeType: props.shapeType,
      callbackFn: props.callbackFn,
      isModalVisible: props.isModalVisible
    };

    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleModalSubmit(e) {
    e.preventDefault();
    console.log("clicked submt");
    console.log(this.state.length);
    this.state.callbackFn(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState((prevState) => {
      if (name == "length") {
        return {
          width: prevState.width,
          radius: prevState.radius,
          length: value,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible
        };
      } else if (name == "width") {
        return {
          width: value,
          radius: prevState.radius,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible
        };
      } else {
        return {
          width: prevState.width,
          radius: value,
          length: prevState.length,
          shapeType: prevState.shapeType,
          callbackFn: prevState.callbackFn,
          isModalVisible: prevState.isModalVisible
        };
      }
    });
  }

  render() {
    const style = {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "3px solid #000",
      boxShadow: 24,
      p: 4
    };
    const ariaLabel = { "aria-label": "description" };
    return (
      <div>
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={this.handleModalSubmit}>
              <div>
                {this.state.shapeType === "circle" && (
                  <div>
                    <label>
                      Radius:
                      <div>
                        <input
                          type="text"
                          name="radius"
                          value={this.state.radius}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
                {(this.state.shapeType === "square" ||
                  this.state.shapeType == "rectangle") && (
                  <div>
                    <label>
                      Length
                      <div>
                        <input
                          type="text"
                          name="length"
                          value={this.state.length}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
                {this.state.shapeType === "rectangle" && (
                  <div>
                    <label>
                      Width:
                      <div>
                        <input
                          type="text"
                          name="width"
                          value={this.state.width}
                          onChange={this.handleChange}
                        />
                      </div>
                    </label>
                  </div>
                )}
              </div>
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

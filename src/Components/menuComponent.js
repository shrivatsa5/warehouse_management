import { ButtonGroup, Button } from "@material-ui/core";
const MenuCompponent = (props) => {
  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        orientation="vertical"
      >
        <Button
          onClick={(e) => {
            props.showModalView("square");
          }}
        >
          Square
        </Button>
        <Button
          onClick={(e) => {
            props.showModalView("rectangle");
          }}
        >
          Rectangle
        </Button>
        <Button
          onClick={(e) => {
            props.showModalView("circle");
          }}
        >
          Circle
        </Button>
        <Button onClick={props.handleSave}>Save</Button>
        <div>
          <label>Upload invoice</label>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              props.handleInvoice(e);
            }}
          />
        </div>
      </ButtonGroup>
    </div>
  );
};

export default MenuCompponent;

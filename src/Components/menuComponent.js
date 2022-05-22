import { ButtonGroup, Button } from '@material-ui/core';
import './menuComponent.css';
const MenuCompponent = (props) => {
  return (
    <ButtonGroup
      variant='contained'
      aria-label='outlined primary button group'
      orientation='vertical'
      className='button_holder'
    >
      <Button
        onClick={(e) => {
          props.showModalView('rectangle');
        }}
      >
        Rectangle
      </Button>
      <Button
        onClick={(e) => {
          props.showModalView('circle');
        }}
      >
        Circle
      </Button>
      <Button onClick={props.handleSave}>Save</Button>
      <div>
        <label>Upload Invoices here</label>
        <input
          type='file'
          name='file'
          onChange={(e) => {
            props.handleInvoice(e);
          }}
        />
      </div>
    </ButtonGroup>
  );
};

export default MenuCompponent;

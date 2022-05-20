import RectangleModel from './Models/shape_model/rectangleModel';
import SquareModel from './Models/shape_model/squareModel';
import CircleModel from './Models/shape_model/circleModel';
//function takes shapeType and returns shapeModel

const getShapeModel = (props) => {
  console.log(props);
  var MAX_RANGE = 1000000;

  if (props.shapeType === 'rectangle') {
    return new RectangleModel(
      Math.floor(Math.random() * MAX_RANGE).toString(),
      Math.random() * props.state.width,
      Math.random() * props.state.height,
      props.length,
      props.width,
      'orange'
    );
  } else if (props.shapeType === 'square') {
    return new SquareModel(
      Math.floor(Math.random() * MAX_RANGE).toString(),
      Math.floor(Math.random() * props.state.width),
      Math.floor(Math.random() * props.state.height),
      props.length,
      'green'
    );
  } else if (props.shapeType === 'circle') {
    return new CircleModel(
      Math.floor(Math.random() * MAX_RANGE).toString(),
      Math.floor(Math.random() * props.state.width),
      Math.floor(Math.random() * props.state.height),
      props.radius,
      'blue'
    );
  }
};

export default getShapeModel;

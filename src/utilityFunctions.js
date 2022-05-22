import RectangleModel from './Models/shape_model/rectangleModel';
import SquareModel from './Models/shape_model/squareModel';
import CircleModel from './Models/shape_model/circleModel';
//function takes shapeType and returns shapeModel

const getShapeModel = (props) => {
  console.log(props);
  var MAX_RANGE = 1000000;

  if (props.shapeType === 'rectangle') {
    console.log('in utility');

    console.log(props.state);
    return new RectangleModel(
      Math.floor(Math.random() * MAX_RANGE).toString(),
      //giving constant position for every rectabgle
      100,
      100,
      parseInt(props.length),
      parseInt(props.width),
      'orange',
      true
    );
  } else if (props.shapeType === 'circle') {
    console.log('returning circleModel');
    console.log(props.radius);
    return new CircleModel(
      Math.floor(Math.random() * MAX_RANGE).toString(),
      300,
      300,
      parseInt(props.radius),
      'blue'
    );
  }
};

export default getShapeModel;

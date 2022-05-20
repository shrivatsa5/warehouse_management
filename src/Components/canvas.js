import { Stage, Layer, Rect, Circle } from 'react-konva';
const CanvasComponent = (props) => {
  //defining a utility function which after taking necessary data as input returns konva rectangle or circle object
  const getKonvaCoreShapes = (shape, id, height, width, radius, color) => {
    if (shape === 'rectangle') {
      return (
        <Rect
          draggable
          id={id}
          x={40}
          y={50}
          width={parseInt(width)}
          height={parseInt(height)}
          fill={color}
          shadowBlur={10}
          onDragStart={props.handleDragStart}
          onDragEnd={props.handleDragEnd}
        />
      );
    } else {
      return (
        <Circle
          draggable
          x={200}
          y={100}
          radius={parseInt(radius)}
          fill={color}
        />
      );
    }
  };

  return (
    <Stage
      width={props.state.height}
      height={props.state.width}
      style={{
        backgroundColor: 'pink',
        borderRadius: '15px',
        overflow: 'hidden',
      }}
    >
      <Layer>
        {props.state.outerWareHouseObj != null
          ? (() => {
              console.log(props.state.outerWareHouseObj.shapeModel.shapeType);
              if (
                props.state.outerWareHouseObj.shapeModel.shapeType ===
                'rectangle'
              ) {
                return getKonvaCoreShapes(
                  'rectangle',
                  props.state.outerWareHouseObj.shapeModel.id,
                  props.state.outerWareHouseObj.shapeModel.height,
                  props.state.outerWareHouseObj.shapeModel.width,
                  null,
                  'red'
                );
              } else if (
                props.state.outerWareHouseObj.shapeModel.shapeType === 'circle'
              ) {
                return getKonvaCoreShapes(
                  'circle',
                  props.state.outerWareHouseObj.shapeModel.id,
                  null,
                  null,
                  props.state.outerWareHouseObj.shapeModel.radius,
                  'blue'
                );
              }
            })()
          : null}
        {props.state.outerWareHouseObj != null
          ? props.state.outerWareHouseObj.skuList.map((skuUnit) => {
              if (skuUnit.shapeModel.shapeType === 'rectangle') {
                return getKonvaCoreShapes(
                  'rectangle',
                  skuUnit.id,
                  skuUnit.height,
                  skuUnit.width,
                  null,
                  'red'
                );
              } else if (skuUnit.shapeModel.shapeType === 'circle') {
                return getKonvaCoreShapes(
                  'circle',
                  skuUnit.id,
                  null,
                  null,
                  skuUnit.radius,
                  'blue'
                );
              }
              return null;
            })
          : null}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;

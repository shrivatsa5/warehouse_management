import { Stage, Layer, Rect, Circle } from 'react-konva';
const CanvasComponent = (props) => {
  //defining a utility function which after taking necessary data as input returns konva rectangle or circle object
  const getKonvaCoreShapes = (
    shape,
    id,
    height,
    width,
    radius,
    color,
    posX,
    posY
  ) => {
    if (shape === 'rectangle') {
      return (
        <Rect
          draggable
          id={id}
          x={parseInt(posX)}
          y={parseInt(posY)}
          width={parseInt(width)}
          height={parseInt(height)}
          fill={color}
          shadowBlur={10}
          onDragStart={props.handleDragStart}
          onDragEnd={props.handleDragEnd}
          onDblClick={props.handleDoubleClick}
        />
      );
    } else {
      return (
        <Circle
          id={id}
          draggable
          x={parseInt(posX)}
          y={parseInt(posY)}
          radius={parseInt(radius)}
          fill={color}
          onDragStart={props.handleDragStart}
          onDragEnd={props.handleDragEnd}
          onDblClick={props.handleDoubleClick}
        />
      );
    }
  };

  return (
    <Stage
      width={props.state.height}
      height={props.state.width}
      style={{
        backgroundColor: 'rgb(29, 52, 117)',
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
                  'white',
                  props.state.outerWareHouseObj.shapeModel.posX,
                  props.state.outerWareHouseObj.shapeModel.posY
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
                  'white',
                  props.state.outerWareHouseObj.shapeModel.posX,
                  props.state.outerWareHouseObj.shapeModel.posY
                );
              }
            })()
          : null}
        {props.state.outerWareHouseObj != null
          ? props.state.outerWareHouseObj.skuList.map((skuUnit) => {
              if (skuUnit.shapeModel.shapeType === 'rectangle') {
                console.log('rendering rectangle');
                return getKonvaCoreShapes(
                  'rectangle',
                  skuUnit.shapeModel.id,
                  skuUnit.shapeModel.height,
                  skuUnit.shapeModel.width,
                  null,
                  skuUnit.shapeModel.color,
                  skuUnit.shapeModel.posX,
                  skuUnit.shapeModel.posY
                );
              } else if (skuUnit.shapeModel.shapeType === 'circle') {
                console.log('rendering circle');
                return getKonvaCoreShapes(
                  'circle',
                  skuUnit.shapeModel.id,
                  null,
                  null,
                  skuUnit.shapeModel.radius,
                  skuUnit.shapeModel.color,
                  skuUnit.shapeModel.posX,
                  skuUnit.shapeModel.posY
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

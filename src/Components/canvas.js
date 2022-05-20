import { Stage, Layer, Rect, Circle } from 'react-konva';
const CanvasComponent = (props) => {
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
                return (
                  <Rect
                    draggable
                    id={props.state.outerWareHouseObj.shapeModel.id}
                    x={40}
                    y={50}
                    width={parseInt(
                      props.state.outerWareHouseObj.shapeModel.width
                    )}
                    height={parseInt(
                      props.state.outerWareHouseObj.shapeModel.height
                    )}
                    fill='red'
                    shadowBlur={10}
                    onDragStart={props.handleDragStart}
                    onDragEnd={props.handleDragEnd}
                    on
                  />
                );
              } else if (
                props.state.outerWareHouseObj.shapeModel.shapeType === 'circle'
              ) {
                return (
                  <Circle
                    draggable
                    x={200}
                    y={100}
                    radius={parseInt(
                      props.state.outerWareHouseObj.shapeModel.radius
                    )}
                    fill={props.state.outerWareHouseObj.shapeModel.color}
                  />
                );
              }
            })()
          : null}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;

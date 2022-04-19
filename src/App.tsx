import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { beginStroke, endStroke, updateStroke } from "./state/actions"
import { drawStroke, clearCanvas, setCanvasSize } from "./utils/canvasUtils"
import { currentStrokeSelector } from "./state/rootReducer";
import { ColorPanel } from './shared/ColorPanel';

const WIDTH = 1024
const HEIGHT = 768

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") }
  }

  const dispatch = useDispatch()

  const currentStroke = useSelector(currentStrokeSelector)

  const isDrawing = Boolean(currentStroke.points.length)

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!canvas || !context) {
      return
    }

    setCanvasSize(canvas, WIDTH, HEIGHT)

    context.lineJoin = "round"
    context.lineCap = "round"
    context.lineWidth = 3
    context.strokeStyle = "black"

    clearCanvas(canvas)
  }, [])

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) {
      return
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  }, [currentStroke])

  const startDrawing = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(ev);

    const { offsetX, offsetY } = ev.nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke())
    }
  }

  const draw = ({
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    dispatch(updateStroke(offsetX, offsetY))
  }

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <ColorPanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;

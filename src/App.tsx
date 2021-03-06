import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useCanvas } from "./CanvasContext"
import { drawStroke, clearCanvas, setCanvasSize } from "./utils/canvasUtils"

import { ColorPanel } from './shared/ColorPanel';
import { EditPanel } from './shared/EditPanel';
import { FilePanel } from "./shared/FilePanel"

import { endStroke } from './modules/sharedActions';
import { beginStroke, currentStrokeSelector, updateStroke } from './modules/currentStroke/reducer';
import { historyIndexSelector } from './modules/historyIndex/reducer';
import { strokesSelector } from './modules/strokes/reducer';
import { ModalLayer } from './ModalLayer';

const WIDTH = 1024
const HEIGHT = 768

function App() {
  const canvasRef = useCanvas()

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") }
  }

  const dispatch = useDispatch()

  const currentStroke = useSelector(currentStrokeSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)

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

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!context || !canvas) {
      return
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas)

      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => {
          drawStroke(context, stroke.points, stroke.color)
        })
    })
  }, [historyIndex, strokes])

  const startDrawing = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(ev);

    const { offsetX, offsetY } = ev.nativeEvent
    dispatch(beginStroke({x: offsetX, y: offsetY}))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }))
    }
  }

  const draw = ({
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    dispatch(updateStroke({ x: offsetX, y: offsetY }))
  }
// todo: change styles for EditPanel and ControlPanel
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
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

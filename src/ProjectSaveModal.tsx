import { ChangeEvent, useState } from 'react'
import { useDispatch } from "react-redux"
import { useCanvas } from './CanvasContext'
import { hide } from "./modules/modals/slice"
import { saveProject } from './modules/strokes/reducer'
import { AppDispatch } from './state/store'
import { getCanvasImage } from './utils/canvasUtils'
import { getBase64Thumbnail } from './utils/scaler'

export const ProjectSaveModal = () => {
  const [projectName, setProjectName] = useState("")

  const canvasRef = useCanvas()
  const dispatch: AppDispatch = useDispatch()

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  const onProjectSave = async () => {
    const file = await getCanvasImage(canvasRef.current)
    if (!file) {
      return
    }
    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 })
    dispatch(saveProject({ projectName, thumbnail }))
    setProjectName("")
    dispatch(hide())
  }

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Save</div>
      </div>
      <div className="window-body">
        <div className="field-row-stacked">
          <label htmlFor="projectName">Project name</label>
          <input
            id="projectName"
            onChange={onProjectNameChange}
            type="text"
          />
        </div>
        <div className="field-row">
          <button onClick={onProjectSave}>Save</button>
          <button onClick={() => dispatch(hide())}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
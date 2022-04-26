import { ModalState } from '../modules/modals/slice'

export type RootState = {
  currentStroke: Stroke
  strokes: Stroke[]
  historyIndex: number
  modalVisible: ModalState
  projectsList: {
    error?: string
    pending: boolean
    projects: Project[]
  }
}

export type Stroke = {
  points: Point[]
  color: string
}

export type Point = {
  x: number
  y: number
}

export type Project = {
  image: string
  name: string
  id: string
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from '../../utils/types'
import { endStroke } from '../sharedActions'
import { newProject } from "./api"

const initialState: RootState["strokes"] = []

const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload
      if (historyIndex === 0) {
        state.push(stroke)
      } else {
        state.splice(-historyIndex, historyIndex, stroke)
      }
    })
  }
})

export default strokes.reducer

export const strokesSelector = (state: RootState) => state.strokes

export const strokesLengthSelector = (state: RootState) => state.strokes.length

type SaveProjectArg = {
  projectName: string
  thumbnail: string
}

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async (
    { projectName, thumbnail }: SaveProjectArg,
    { getState }
  ) => {
    try {
      const response = await newProject(
        projectName,
        (getState() as RootState)?.strokes,
        thumbnail
      )
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
)
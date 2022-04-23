import { createReducer } from "@reduxjs/toolkit"
import { RootState } from '../../utils/types'
import { endStroke } from '../sharedActions'

const initialStrokes: RootState["strokes"] = []

export const reducer = createReducer(initialStrokes, (builder) => {
  builder.addCase(endStroke, (state, action) => {
    const { historyIndex, stroke } = action.payload
    if (historyIndex === 0) {
      state.push(stroke)
    } else {
      state.splice(-historyIndex, historyIndex, stroke)
    }
  })
})

export const strokesSelector = (state: RootState) => state.strokes

export const strokesLengthSelector = (state: RootState) => state.strokes.length
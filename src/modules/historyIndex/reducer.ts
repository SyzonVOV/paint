import { createReducer } from "@reduxjs/toolkit"
import { RootState } from '../../utils/types'
import { undo, redo } from "./actions"
import { endStroke } from "../sharedActions"

const initialState: RootState["historyIndex"] = 0

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(undo, (state, action) => {
    return Math.min(state + 1, action.payload)
  })
  builder.addCase(redo, (state) => {
    return Math.max(state - 1, 0)
  })
  builder.addCase(endStroke, () => {
    return 0
  })
})

export const historyIndexSelector = (state: RootState) => state.historyIndex
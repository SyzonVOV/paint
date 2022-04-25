import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'

import historyIndex from "../modules/historyIndex/reducer"
import { currentStroke } from "../modules/currentStroke/reducer"
import strokes from "../modules/strokes/reducer"
import { modalVisible } from "../modules/modals/slice"

export const store = configureStore({
   reducer: {
      historyIndex,
      currentStroke,
      strokes,
      modalVisible
   },
   middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(logger)
})

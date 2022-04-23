import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'

import historyIndex from "../modules/historyIndex/reducer"
import { reducer as currentStroke } from "../modules/currentStroke/reducer"
import { reducer as strokes } from "../modules/strokes/reducer"

export const store = configureStore({
   reducer: {
      historyIndex,
      currentStroke,
      strokes
   },
   middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(logger)
})

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import logger from 'redux-logger'

import historyIndex from "../modules/historyIndex/reducer"
import { currentStroke } from "../modules/currentStroke/reducer"
import strokes from "../modules/strokes/reducer"
import { modalVisible } from "../modules/modals/slice"
import { projectsList } from "../modules/projectsList/slice"

import { RootState } from "../utils/types"
import { useDispatch } from 'react-redux'

export const store = configureStore({
   reducer: {
      historyIndex,
      currentStroke,
      strokes,
      modalVisible,
      projectsList
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger)
})

export type AppThunk = ThunkAction<
   void,
   RootState,
   unknown,
   Action<string>
>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

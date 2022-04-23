import { Point, Stroke } from "../../utils/types"
import { AnyAction, createAction } from "@reduxjs/toolkit"

export type Action =
  | AnyAction
  | ReturnType<typeof beginStroke>
  | ReturnType<typeof updateStroke>
  | ReturnType<typeof setStrokeColor>

export const beginStroke = createAction<Point>("BEGIN_STROKE")

export const updateStroke = createAction<Point>("UPDATE_STROKE")

export const setStrokeColor = createAction<string>("SET_STROKE_COLOR")
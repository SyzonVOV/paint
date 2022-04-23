import { AnyAction, createAction } from "@reduxjs/toolkit"

export type Action =
 | AnyAction
 | ReturnType<typeof undo>
 | ReturnType<typeof redo>

export const undo = createAction<number>("UNDO")

export const redo = createAction("REDO")
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../utils/types"

type Modals = "PROJECTS_SAVE_MODAL" | "PROJECTS_MODAL"

export type ModalState = {
  isShown: boolean
  modalName: Modals | null
}

const initialState: ModalState = {
  isShown: true,
  modalName: null
}

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Modals>) => {
      state.isShown = true
      state.modalName = action.payload
    },
    hide: (state) => {
      state.isShown = false
      state.modalName = null
    }
  }
})

export const modalVisible = slice.reducer

export const { show, hide } = slice.actions

export const modalVisibleSelector = (state: RootState) =>
  state.modalVisible.isShown

export const modalNameSelector = (state: RootState) =>
  state.modalVisible.modalName
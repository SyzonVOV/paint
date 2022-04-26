import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../utils/types"
import { fetchProjectsList } from "./api"

const initialState: RootState["projectsList"] = {
  error: undefined,
  pending: false,
  projects: []
}

const slice = createSlice({
  name: "projectsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.pending = false
      state.projects = action.payload
      state.error = undefined
    })
    builder.addCase(getProjectsList.rejected, (state) => {
      state.pending = false
      state.error = "Something went wrong"
    })
  }
})

export const getProjectsList = createAsyncThunk(
  "GET_PROJECTS_LIST",
  async () => {
    return fetchProjectsList()
  }
)

export const projectsList = slice.reducer

export const projectsListSelector = (state: RootState) =>
  state.projectsList.projects
export const projectsListPendingSelector = (state: RootState) =>
  state.projectsList.pending
export const projectsListErrorSelector = (state: RootState) =>
  state.projectsList.error
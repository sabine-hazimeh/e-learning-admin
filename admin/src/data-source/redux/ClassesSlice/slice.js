import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  error: null,
  isLoading: false,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    fetchClassesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchClassesSuccess(state, action) {
      state.isLoading = false;
      state.classes = action.payload;
    },
    fetchClassesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addClassStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addClassSuccess(state, action) {
      state.isLoading = false;
      state.classes.push(action.payload);
    },
    addClassFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateClass(state, action) {
      const index = state.classes.findIndex(
        (course) => course._id === action.payload._id
      );
      if (index !== -1) {
        state.classes[index] = action.payload;
      }
    },
    deleteClass(state, action) {
      state.classes = state.classes.filter(
        (course) => course._id !== action.payload
      );
    },
  },
});

export const {
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
  addClassStart,
  addClassSuccess,
  addClassFailure,
  updateClass,
  deleteClass,
} = classesSlice.actions;

export default classesSlice.reducer;

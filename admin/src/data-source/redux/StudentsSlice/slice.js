import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
  error: null,
  isLoading: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchEnrollmentsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchEnrollmentsSuccess(state, action) {
      state.isLoading = false;
      state.enrollments = action.payload;
    },
    fetchEnrollmentsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
} = studentsSlice.actions;

export default studentsSlice.reducer;

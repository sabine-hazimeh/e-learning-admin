import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  error: null,
  isLoading: false,
};

const withdrawalsSlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {
    fetchWithdrawalsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchWithdrawalsSuccess(state, action) {
      state.isLoading = false;
      state.withdrawals = action.payload;
    },
    fetchWithdrawalsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    acceptWithdrawal(state, action) {
      state.withdrawals = state.withdrawals.filter(
        (withdrawal) => withdrawal._id !== action.payload
      );
    },
    rejectWithdrawal(state, action) {
      state.withdrawals = state.withdrawals.filter(
        (withdrawal) => withdrawal._id !== action.payload
      );
    },
  },
});

export const {
  fetchWithdrawalsStart,
  fetchWithdrawalsSuccess,
  fetchWithdrawalsFailure,
  acceptWithdrawal,
  rejectWithdrawal,
} = withdrawalsSlice.actions;

export default withdrawalsSlice.reducer;

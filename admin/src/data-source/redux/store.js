import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./UserSlice/slice";
import classesReducer from "./ClassesSlice/slice";
import studentsReducer from "./StudentsSlice/slice";
import withdrawalsReducer from "./WithDrawals/slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: usersReducer,
    classes: classesReducer,
    students: studentsReducer,
    withdrawals: withdrawalsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

export default store;

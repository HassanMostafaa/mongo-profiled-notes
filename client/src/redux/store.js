import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUser/currentUserSlice";
import notesSlice from "./notes/notesSlice";
const store = configureStore({
  reducer: {
    currentUserReducer: currentUserSlice.reducer,
    notesReducer: notesSlice.reducer,
  },
});
export default store;

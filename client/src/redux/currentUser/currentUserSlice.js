import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  fetched: null,
};

export const loginThunk = createAsyncThunk(
  /*type*/ "LOGIN",
  /* action */ async (arg, { rejectWithValue }) => {
    try {
      const { formData } = arg;
      const res = await axios.post("/api/users/login", formData);
      const data = await res.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  /*type*/ "LOGOUT",
  /* action */ async (arg, { rejectWithValue }) => {
    try {
      await axios.get("/api/users/logout");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCurrentUser = createAsyncThunk(
  "deleteUser",
  async ({ id }, thunkAPI) => {
    try {
      // console.log(arg.id);
      await axios.post("/api/users/delete", { id });
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    setUserState: (state, { payload }) => {
      // console.log(payload);
      state.currentUser = payload;
    },
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload.user;
      state.fetched = payload;
      state.loading = false;
    },
    [loginThunk.pending]: (state) => {
      state.currentUser = null;
      state.loading = true;
    },
    [loginThunk.rejected]: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      state.fetched = null;
      state.loading = false;
    },
  },
});
export const { setUserState } = currentUserSlice.actions;
export default currentUserSlice;

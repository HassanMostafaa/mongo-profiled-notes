import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  showNewNoteForm: false,
};

export const updataNotesThunk = createAsyncThunk(
  "Add NOTE",
  async ({ userId, note, currentUserNotes }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updataNotes(note));
      const res = await axios.post("/api/users/home/notes", {
        id: userId,
        notes: [...currentUserNotes, note],
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNoteThunk = createAsyncThunk(
  "DELETE_NOTE_BY_ID",
  async (/*arg*/ { userId, noteId }, thunkAPI) => {
    try {
      // updating redux
      const state = thunkAPI.getState().notesReducer;
      thunkAPI.dispatch(deleteNote(noteId));
      //syncing database with the redux
      await axios.post("/api/users/home/notes", {
        id: userId,
        notes: state.notes.filter((x) => x.id !== noteId),
      });
      return;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.meesage);
    }
  }
);

const notesSlice = createSlice({
  name: "notesSlice",
  initialState,
  reducers: {
    setNotes: (state, { payload }) => {
      // console.log("set notes state: ", state.notes);
      state.notes = payload;
    },
    updataNotes: (state, { payload }) => {
      //   console.log("update notes state: ", state);
      state.notes = [...state.notes, payload];
    },
    resetNotes: (state) => {
      state.notes = [];
    },
    deleteNote: (state, { payload }) => {
      state.notes = state.notes.filter((x) => x.id !== payload);
    },
    toggleNewNoteForm: (state) => {
      state.showNewNoteForm = !state.showNewNoteForm;
    },
  },
  extraReducers: {},
});

export const { setNotes, updataNotes, resetNotes, deleteNote } =
  notesSlice.actions;
export default notesSlice;

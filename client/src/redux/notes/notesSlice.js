import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  showNewNoteForm: false,
  showEditNoteForm: false,
  editNoteFormData: { title: "", desc: "", id: "" },
};

export const updataNotesThunk = createAsyncThunk(
  "Add NOTE",
  async ({ userId, note, currentUserNotes }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updataNotes(note));
      await axios.post(
        `https://mongo-profiled-notes.herokuapp.com/api/users/home/notes`,
        {
          id: userId,
          notes: [...currentUserNotes, note],
        }
      );
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const setEditedNoteThunk = createAsyncThunk(
  "updateNotesDBAfterEditing",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setEditedNote({ id: arg.id }));

    const currentUserNotes = thunkAPI.getState().notesReducer.notes;
    const currentUserId =
      thunkAPI.getState().currentUserReducer.currentUser._id;

    await axios.post(
      `https://mongo-profiled-notes.herokuapp.com/api/users/home/notes`,
      {
        id: currentUserId,
        notes: currentUserNotes,
      }
    );
    return;
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
      await axios.post(
        `https://mongo-profiled-notes.herokuapp.com/api/users/home/notes`,
        {
          id: userId,
          notes: state.notes.filter((x) => x.id !== noteId),
        }
      );
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
      state.notes = payload;
    },
    updataNotes: (state, { payload }) => {
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
    toggleEditNoteForm: (state) => {
      state.showEditNoteForm = !state.showEditNoteForm;
    },
    editNoteFormData: (state, { payload }) => {
      state.editNoteFormData = payload;
    },
    updateEditFormTitle: (state, { payload }) => {
      state.editNoteFormData.title = payload;
    },
    updateEditFormDesc: (state, { payload }) => {
      state.editNoteFormData.desc = payload;
    },
    setEditedNote: (state, { payload }) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id
          ? {
              ...note,
              title: state.editNoteFormData.title,
              desc: state.editNoteFormData.desc,
            }
          : note
      );
      state.showEditNoteForm = false;
    },
  },
  extraReducers: {},
});

// const initialState = {
//   notes: [],
//   showNewNoteForm: false,
//   showEditNoteForm: false,
//   editNoteFormData: { title: "", desc: "" },
// };

export const {
  setNotes,
  updataNotes,
  resetNotes,
  deleteNote,
  toggleNewNoteForm,
  toggleEditNoteForm,
  editNoteFormData,
  updateEditFormTitle,
  updateEditFormDesc,
  setEditedNote,
} = notesSlice.actions;
export default notesSlice;

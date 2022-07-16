import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleEditNoteForm,
  updateEditFormTitle,
  updateEditFormDesc,
  setEditedNoteThunk,
} from "../redux/notes/notesSlice";

export const EditNoteForm = () => {
  const dispatch = useDispatch();
  const { title, desc, id } = useSelector(
    (state) => state.notesReducer.editNoteFormData
  );

  const handleEditNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(setEditedNoteThunk({ id }));
  };

  return (
    <>
      <div
        className="add-note-area"
        onClick={() => {
          dispatch(toggleEditNoteForm());
        }}
      ></div>
      <form onSubmit={handleEditNoteSubmit} className="add-note-form">
        <p>Note Title</p>
        <input
          type="text"
          placeholder="note titlte"
          value={title}
          onChange={(e) => dispatch(updateEditFormTitle(e.target.value))}
        />
        <p>Note desc</p>
        <input
          type="text"
          placeholder="note desc"
          value={desc}
          onChange={(e) => dispatch(updateEditFormDesc(e.target.value))}
        />

        <input type="submit" value="Update" />
      </form>
    </>
  );
};

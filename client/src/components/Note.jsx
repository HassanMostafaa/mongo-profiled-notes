import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNoteThunk } from "../redux/notes/notesSlice";

export const Note = ({ note }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer.currentUser);

  const handleDeleteNote = async () => {
    dispatch(deleteNoteThunk({ userId: user._id, noteId: note.id }));
  };

  return (
    <div className="note">
      <p>{note.title}</p>
      <p>{note.desc}</p>
      <h6 style={{ color: "grey" }}>{note.id}</h6>
      <button onClick={handleDeleteNote}>Delete</button>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotes,
  toggleNewNoteForm,
  updataNotes,
  updataNotesThunk,
} from "../redux/notes/notesSlice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const AddNoteForm = ({ user }) => {
  const currentUserNotes = useSelector((state) => state.notesReducer.notes);
  const dispatch = useDispatch();

  const [noteFormData, setNoteFormData] = useState({
    title: "",
    desc: "",
    id: uuidv4(),
    createdAt: `${new Date()}`,
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("add note");
    dispatch(
      updataNotesThunk({
        userId: user._id,
        note: noteFormData,
        currentUserNotes,
      })
    );
    setNoteFormData({
      title: "",
      desc: "",
      id: uuidv4(),
      createdAt: `${new Date()}`,
    });
    dispatch(toggleNewNoteForm());
  };

  return (
    <>
      <div
        className="add-note-area"
        onClick={() => {
          dispatch(toggleNewNoteForm());
        }}
      ></div>
      <form className="add-note-form" onSubmit={handleAddNote}>
        <h3>Add Note</h3>
        <p>Note Title</p>
        <input
          type="text"
          name=""
          id=""
          value={noteFormData.title}
          onChange={(e) =>
            setNoteFormData({ ...noteFormData, title: e.target.value })
          }
        />
        <p>Note Desc</p>
        <textarea
          type="text"
          name=""
          id=""
          value={noteFormData.desc}
          onChange={(e) =>
            setNoteFormData({ ...noteFormData, desc: e.target.value })
          }
        />
        <input className="btn" type="submit" value="Enter" />
      </form>
    </>
  );
};

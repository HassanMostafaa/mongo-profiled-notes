import { useSelector, useDispatch } from "react-redux";
import {
  deleteNoteThunk,
  editNoteFormData,
  toggleEditNoteForm,
} from "../redux/notes/notesSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const Note = ({ note }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer.currentUser);

  const handleDeleteNote = async () => {
    dispatch(deleteNoteThunk({ userId: user._id, noteId: note.id }));
  };

  return (
    <>
      <div className="note">
        <button
          className="btn"
          onClick={handleDeleteNote}
          style={{ float: "right" }}
        >
          Delete
        </button>{" "}
        <button
          className="btn"
          style={{ float: "right" }}
          onClick={() => {
            dispatch(toggleEditNoteForm());
            dispatch(
              editNoteFormData({
                title: note.title,
                desc: note.desc,
                id: note.id,
              })
            );
          }}
        >
          Edit
        </button>
        <p className="note-title">{note.title}</p>
        <p className="note-txt">{note.desc}</p>
        <h6>{note.id}</h6>
        <h6>
          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
        </h6>
      </div>
    </>
  );
};

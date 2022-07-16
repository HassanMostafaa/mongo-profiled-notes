import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AddNoteForm } from "../components/AddNoteForm";
import { setNotes, toggleNewNoteForm } from "../redux/notes/notesSlice";
import { setUserState } from "../redux/currentUser/currentUserSlice";
import { NotesList } from "../components/NotesList";
import { EditNoteForm } from "../components/EditNoteForm";

export const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "" });
  const [loading, setLoading] = useState(true);
  const notes = useSelector((state) => state.notesReducer.notes);
  const showNewNoteForm = useSelector(
    (state) => state.notesReducer.showNewNoteForm
  );
  const showEditNoteForm = useSelector(
    (state) => state.notesReducer.showEditNoteForm
  );

  useEffect(() => {
    const homeRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_MAIN_DIRECTORY}/api/users/home`);
      const data = await res.data;
    
      try {
        setUser(JSON.parse(data.session).user);
        dispatch(setNotes(JSON.parse(data.session).user.notes));
        dispatch(setUserState(JSON.parse(data.session).user));
      } catch (error) {
        navigate("/login");
        alert("SESSION EXPIRED");
      }
      setLoading(false);
    };

    homeRequest();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <div>
            <br />
            <NotesList notes={notes} />{" "}
            <button
              className="btn"
              onClick={() => {
                window.scrollTo(0, 0);
                dispatch(toggleNewNoteForm());
              }}
            >
              ADD NOTE
            </button>
            {/* <button
              style={{
                fontSize: "20px",
                borderRadius: "50%",
                padding: "10px 15px",
                position: "absolute",
                bottom: "100px",
                right: "100px",
              }}
              className="btn"
              onClick={() => {
                window.scrollTo(0, 0);
                dispatch(toggleNewNoteForm());
              }}
            >
              +
            </button> */}
            {showNewNoteForm && <AddNoteForm user={user} />}
            {showEditNoteForm && <EditNoteForm />}
          </div>
        </>
      ) : (
        <Navigate to="/login" replace></Navigate>
      )}
    </div>
  );
};

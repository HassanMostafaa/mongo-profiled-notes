import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AddNoteForm } from "../components/AddNoteForm";
import { resetNotes, setNotes } from "../redux/notes/notesSlice";
import {
  logoutThunk,
  setUserState,
} from "../redux/currentUser/currentUserSlice";
import { NotesList } from "../components/NotesList";

export const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "" });
  const [loading, setLoading] = useState(true);
  const notes = useSelector((state) => state.notesReducer.notes);

  const handleLogout = async () => {
    dispatch(logoutThunk());
    dispatch(resetNotes());
    navigate("/login");
  };

  const homeRequest = async () => {
    const res = await axios.get("/api/users/home");
    const data = await res.data;

    console.log(JSON.parse(data.session).user);

    try {
      setUser(JSON.parse(data.session).user);
      dispatch(setNotes(JSON.parse(data.session).user.notes));
      dispatch(setUserState(JSON.parse(data.session).user));
    } catch (error) {
      console.log(error);
      navigate("/login");
      alert("SESSION EXPIRED");
    }
    setLoading(false);
  };

  useEffect(() => {
    homeRequest();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <div>
            <h3>User Info</h3>
            <p>email : {user.email}</p>
            <NotesList notes={notes} />
            <div className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <AddNoteForm user={user} />
          </div>
        </>
      ) : (
        <Navigate to="/login" replace></Navigate>
      )}
    </div>
  );
};

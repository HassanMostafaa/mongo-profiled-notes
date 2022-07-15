import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetNotes, setNotes } from "../redux/notes/notesSlice";
import {
  logoutThunk,
  setUserState,
  deleteCurrentUser,
} from "../redux/currentUser/currentUserSlice";
import format from "date-fns/format";
import moment from "moment";

export const Profile = () => {
  const currentUser = useSelector(
    (state) => state.currentUserReducer.currentUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutThunk());
    dispatch(resetNotes());
    navigate("/login");
  };

  const homeRequest = async () => {
    const res = await axios.get("/api/users/home");
    const data = await res.data;
    try {
      dispatch(setNotes(JSON.parse(data.session).user.notes));
      dispatch(setUserState(JSON.parse(data.session).user));
    } catch (error) {
      console.log(error);
      navigate("/login");
      alert("SESSION EXPIRED");
    }
  };
  useEffect(() => {
    homeRequest();
  }, []);

  const handleDeleteUser = async () => {
    const res = await dispatch(deleteCurrentUser({ id: currentUser._id }));
    if (res.type === "deleteUser/fulfilled") {
      dispatch(logoutThunk());
      dispatch(resetNotes());
      navigate("/login");
    }
  };

  return (
    <div className="container user-info-area">
      {currentUser ? (
        <>
          {" "}
          <div style={{ float: "right" }}>
            {/* <button className="btn" onClick={handleLogout}>
              Logout
            </button> */}
            <button className="btn" onClick={handleDeleteUser}>
              DELETE USER
            </button>
          </div>
          <p>Username : {currentUser.username}</p>
          <p>Email : {currentUser.email}</p>
          <p>{currentUser.notes.length} Notes Created</p>
          <p>
            Registered : {moment(currentUser.createdAt).format("MMM Do YYYY")}
          </p>
          <p style={{ fontSize: "11px" }}>ID : {currentUser._id}</p>
        </>
      ) : (
        "not found"
      )}
    </div>
  );
};

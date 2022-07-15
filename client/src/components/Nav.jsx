import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/currentUser/currentUserSlice";
import { resetNotes } from "../redux/notes/notesSlice";

export const Nav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.currentUserReducer.currentUser
  );

  const handleNavLogout = () => {
    dispatch(logoutThunk());
    dispatch(resetNotes());
  };

  return (
    <nav>
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <div className="menu">
        {currentUser ? (
          <>
            {currentUser.username ? (
              <>
                <Link to="profile">{currentUser.username.toUpperCase()}</Link>
                <Link to="home">Notes</Link>
                <Link to="login" onClick={handleNavLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="login">Login</Link>
                <Link to="register">Register</Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="login">Login</Link>
            <Link to="register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

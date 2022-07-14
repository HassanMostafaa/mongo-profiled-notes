import { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./../redux/currentUser/currentUserSlice";
import { current } from "@reduxjs/toolkit";

export const LoginForm = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const dispatchResponse = await dispatch(loginThunk({ formData }));

    if (dispatchResponse.meta.requestStatus === "fulfilled") {
      navigate("/home");
    } else {
      navigate("/home");
      console.log("error dispatchResponse: ", dispatchResponse);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>LoginPage</h1>
        <p>email</p>
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={currentUser.loading ? true : false}
        />
        <p>password</p>
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={currentUser.loading ? true : false}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

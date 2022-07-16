import { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./../redux/currentUser/currentUserSlice";
import {
  //MutatingDots,
  Oval,
  //TailSpin,
  // BallTriangle,
} from "react-loader-spinner";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_MAIN_DIRECTORY);
  }, []);

  return (
    <div className="container">
      <div className="login-form-area">
        <form className="login-form" onSubmit={handleLogin}>
          <p>E-mail</p>
          <input
            type="text"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={currentUser.loading ? true : false}
          />
          <p>Password</p>
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
          <input
            className="btn"
            type="submit"
            value="Login"
            disabled={currentUser.loading ? true : false}
          />
          {currentUser.loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Oval
                color={"#000"}
                // radius={0}
                height={60}
                width={60}
                secondaryColor={"#111"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

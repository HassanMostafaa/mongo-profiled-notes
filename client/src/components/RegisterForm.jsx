import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MutatingDots, Oval, TailSpin } from "react-loader-spinner";
export const RegisterForm = () => {
  const navitage = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await axios.post("/api/users/", formData);
    // const data = await res.data;
    if (res.status === 200) {
      setLoading(false);

      navitage("/login");
    } else {
      setLoading(false);
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <div className="login-form-area">
          <form className="login-form" onSubmit={handleRegister}>
            <p>Username</p>
            <input
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value.trim() })
              }
            />
            <p>E-mail</p>
            <input
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
            />
            <input type="submit" value="Register" />
            {loading && <TailSpin color="#000" height={80} width={80} />}
          </form>
        </div>
      )}
    </div>
  );
};

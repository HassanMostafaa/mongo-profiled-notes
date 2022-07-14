import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleRegister}>
          <h1>RegisterPage</h1>
          <p>username</p>
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <p>email</p>
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
          />
          <input type="submit" value="Register" />
        </form>
      )}
    </div>
  );
};

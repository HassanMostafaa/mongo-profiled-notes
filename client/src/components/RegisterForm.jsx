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

    try {
      const res = await axios.post("/api/users/", formData);
      console.log(res);
      setLoading(false);
      navitage("/login");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="login-form-area">
        <form className="login-form" onSubmit={handleRegister}>
          <p>Username</p>
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            disabled={loading ? true : false}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value.trim() })
            }
          />
          <p>E-mail</p>
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            disabled={loading ? true : false}
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
            disabled={loading ? true : false}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="submit"
            value="Register"
            disabled={loading ? true : false}
          />
          {loading && (
            <TailSpin
              color="#000"
              height={80}
              width={80}
              // color={string}
              // radius={undefined}
              // height={undefined}
              // width={undefined}
              // secondaryColor={undefined}
            />
          )}
        </form>
      </div>
    </div>
  );
};

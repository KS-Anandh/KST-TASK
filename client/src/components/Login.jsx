import React, { useState } from "react";
import img from "../assets/show.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userMail, setUserMail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!userMail || !userPassword) {
      alert("Mail and Password Required.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("http://localhost:9600/users/login", {
        userMail,
        userPassword,
      });
      res.data.token ? localStorage.setItem("token", res.data.token) : "";
      alert(res.data.msg);
      setLoading(false);
      res.data.token ? navigation("/profile") : "";
    } catch (error) {
      alert(error.msg);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="login">
        <center>
          <h3 style={{padding:"10px"}}>Login</h3>
        </center>
        <div className="field">
          <p>Enter Your Mail </p>
          <input
            type="gmail"
            placeholder="Enter Your Mail"
            onChange={(e) => setUserMail(e.target.value)}
          />
        </div>
        <div className="field">
          <p>Enter Your Password </p>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <img
              src={img}
              alt=""
              width={20}
              height={25}
              onClick={() => setShowPassword((e) => !e)}
            />
          </div>
        </div>
        <center style={{ color: "blue" }}>
          <Link to={"/"}>
            {" "}
            <p style={{fontSize:"14px"}}>I don't have Account.?</p>
          </Link>
        </center>
        <div className="login-btn">
        {!loading ? (
          <button onClick={submitHandler}>Login</button>
        ) : (
          <button style={{ background: "red" }}>Loading</button>
        )}
        </div>
       
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://stg.dhunjam.in/account/admin/login";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.response === "Success") {
          setLoginMessage("Login successful!");
          setIsLoggedIn(true);

          navigate(`/dashboard/${data.data.id}`);
        } else {
          setLoginMessage("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginMessage("An error occurred. Please try again.");
      });
  };
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="login-page h-full">
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="w-full h-full m-auto flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="heading mb-8 font-bold">Venue Admin Login</h2>

            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="username"
              className="border border-white bg-black px-4 py-2 w-3/4 rounded-xl text-white text-base"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="border border-white bg-black px-4 py-2 w-3/4 my-5 rounded-xl text-white text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <span
              className={`eye-icon ${showPassword ? "visible" : "hidden"}`}
              onClick={togglePasswordVisibility}
            >
              👁️
            </span> */}
          </div>

          <div className="w-3/4 my-4 mx-auto">
            <button
              type="button"
              className="btn w-3/5 py-2 rounded-xl"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
          <p className="text-white text-base ">New Registration ?</p>
          <p id="loginMessage" className="text-white">
            {loginMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

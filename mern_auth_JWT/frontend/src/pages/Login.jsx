import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setloginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const url = "http://localhost:5000/auth/login";
      console.log(loginInfo);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const { success, message, jwtToken, name, error } = await response.json();

      if (success) {
        handleSuccess(message);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", name);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(success, message);
    } catch (error) {
      alert("error ");
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-zinc-900 text-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create an account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-lg py-2 font-semibold"
            >
              Login
            </button>

            {/* Login link */}
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:underline">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;

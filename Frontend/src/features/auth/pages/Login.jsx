import React from "react";
import Email from "../components/Email";
import Password from "../components/Password";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Link } from "react-router";

import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="flex align-middle items-center justify-center h-screen bg-gray-950">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold text-white">Login Page</h3>

        <form action="" className="flex flex-col gap-4" onSubmit={handelSubmit}>
          <Email email={email} setEmail={setEmail} />
          <Password password={password} setPassword={setPassword} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button text="login" />
        </form>

        <div className="text-white pt-5 flex justify-between mx-4">
          <h1 className=" font-light "> new on platform? </h1>
          <Link to="/register" className="text-blue-400">
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default login;

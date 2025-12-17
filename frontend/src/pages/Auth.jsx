import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

/* =====================
   Validation Helpers
===================== */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password) => password.length >= 6;

const isValidName = (name) => name.trim().length >= 2;

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Login State */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* Register State */
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  /* =====================
        LOGIN
===================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(loginEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!loginPassword) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      login(res.data.token);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
       REGISTER
===================== */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidName(name)) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!isValidEmail(registerEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(registerPassword)) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        email: registerEmail,
        password: registerPassword,
      });

      // Switch to login after successful registration
      setTab("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white p-12 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-6">TaskFlow</h1>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Organize your work,
            <br />
            simplify your life
          </h2>
          <p className="opacity-80 mb-8">
            A modern task management app to help you stay focused and productive
            every day.
          </p>
          <ul className="space-y-3">
            <li>• Create and organize tasks</li>
            <li>• Track progress easily</li>
            <li>• Access tasks anywhere</li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-light">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome</h2>
          <p className="text-center text-secondary mb-6">
            Sign in or create a new account
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg mb-6">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 rounded-lg font-medium ${
                tab === "login" ? "bg-white shadow" : "text-secondary"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 rounded-lg font-medium ${
                tab === "register" ? "bg-white shadow" : "text-secondary"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button className="btn-primary w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                className="input"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button className="btn-primary w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000";

const Register = ({ setShowLogin }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      if(password !== confirmPassword) {
        setMessage("Password tidak cocok");
        return;
      }
  
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, confirmPassword }),
      })
  
      const data = await response.json();
      if(response.ok) {
        setIsLoading(false);
        setMessage("Register Success Please Login");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate('/login');
          if (setShowLogin) setShowLogin(true); 
      }, 2000);
      
      } else {
        setMessage(data.message || "Register Failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Register failed:", error.message);
      setIsLoading(false);
    }
  }

  const handleLogin = () => {
    navigate('/login');
    setShowLogin(true);
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <form
          action=""
          onSubmit={handleRegister}
          className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md"
        >
          <p className="mb-5 text-3xl uppercase text-gray-600">Register</p>
            {message === "Register Success Please Login" ? <p className="text-green-600 mb-2">{message}</p> : <p className="text-red-600 mb-2">{message}</p>}
          <input
            type="text"
            name="username"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <input
            type="password"
            name="password"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            type="password"
            name="password"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button
            className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
            id="login"
            type="submit"
          >
            <span>{isLoading ? "Loading..." : "Register"}</span>
          </button>
            <p className="text-sm mt-2">Sudah punya akun? <span onClick={handleLogin} className="text-indigo-600 cursor-pointer">Login</span></p>
        </form>
      </div>
    </>
  );
};

export default Register;

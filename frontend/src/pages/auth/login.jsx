import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setShowLogin }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
  
      const data = await response.json();
      if(response.ok) {
        setUser(data.user);
        localStorage.setItem('token', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
  
    } catch (error) {
      console.error("Login gagal:", error.message);
    }
  }

  const handleRegister = () => {
    // setShowLogin(false);
    navigate('/register');
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <form
          action=""
          onSubmit={handleLogin}
          className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md"
        >
          <p className="mb-5 text-3xl uppercase text-gray-600">Login</p>
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="text"
            name="username"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
          ></input>
          <input
            type="password"
            name="password"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          ></input>
          <button
            className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
            id="login"
            type="submit"
          >
            <span>Login</span>
          </button>
          <p className="text-sm mt-2">Belum punya akun? <span onClick={handleRegister} className="text-blue-500 cursor-pointer">Daftar</span></p>
        </form>
      </div>
    </>
  );
};

export default Login;

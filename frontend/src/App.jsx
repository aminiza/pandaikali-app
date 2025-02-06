import { useEffect, useState } from "react";
import Login from "./pages/auth/login";
import Home from "./pages/Home/Home"
import Register from "./pages/auth/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar";
import History from "./pages/Home/History";


function App() {

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('token');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    const savedToken = localStorage.getItem('token');

    if (!savedToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <Router>
      {user && <Navbar setUser={setUser} />}
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
          } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Home /> 
        </ProtectedRoute>
        } />
      <Route path="/history" element={
        <ProtectedRoute>
          <History /> 
        </ProtectedRoute>
        } />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} setShowLogin={setShowLogin} /> }/>
      <Route path="/register" element={<Register setShowLogin={setShowLogin} /> } />
      <Route path="/logout" element={<Login setUser={setUser} setShowLogin={setShowLogin} />} />
      {/* <Route path="/about" exact element={<About />} />
      <Route path="/contact" exact element={<Contact />} />*/}
    </Routes>
   </Router>
  )
}

export default App

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Pricing from "./pages/public/Pricing";
import Support from "./pages/public/Support";
import Blog from "./pages/public/Blog";
import Docs from "./pages/public/Docs";
import Products from "./pages/public/Products";
import Ecommerce from "./pages/public/Ecommerce";
import MainDashboard from "./pages/MainDashboard";

function App() {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: persist login across page reload
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedUserId && storedEmail) {
      setUserId(storedUserId);
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userId, email) => {
    if (!isLoggedIn) {
      setUserId(userId);
      setUserEmail(email);
      setIsLoggedIn(true);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userEmail", email);
    } else {
      alert("You are already logged in!");
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserEmail("");
    setIsLoggedIn(false);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/pricing"
          element={<Pricing />}
        />
        <Route
          path="/support"
          element={<Support />}
        />
        <Route
          path="/blog"
          element={<Blog />}
        />
        <Route
          path="/docs"
          element={<Docs />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/ecommerce"
          element={<Ecommerce />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard/overview" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/:section"
          element={
            isLoggedIn ? (
              <MainDashboard userId={userId} email={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

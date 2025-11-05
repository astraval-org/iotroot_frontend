import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { isTokenValid } from "./utils/auth";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUserId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("userEmail");
      const hasValidToken = isTokenValid();
      
      if ((storedUserId && storedEmail) || hasValidToken) {
        setUserId(storedUserId || "");
        setUserEmail(storedEmail || "");
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    
    checkAuth();
    
    // Listen for storage changes across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'logout-event') {
        setUserId("");
        setUserEmail("");
        setIsLoggedIn(false);
      } else if (e.key === 'userId' || e.key === 'userEmail' || e.key === 'token') {
        checkAuth();
      }
    };
    
    // Listen for custom logout event
    const handleLogoutEvent = () => {
      setUserId("");
      setUserEmail("");
      setIsLoggedIn(false);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-logout', handleLogoutEvent);
    };
  }, []);

  const handleLoginSuccess = (userId, email) => {
    setUserId(userId);
    setUserEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setUserId("");
    setUserEmail("");
    setIsLoggedIn(false);
    localStorage.clear();
    
    // Trigger logout event for other tabs
    window.dispatchEvent(new CustomEvent('user-logout'));
    
    // Force storage event for cross-tab sync
    localStorage.setItem('logout-event', Date.now().toString());
    localStorage.removeItem('logout-event');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;

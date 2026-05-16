import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

const AUTH_PATHS = ["/login", "/signup"]

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Blobs — hidden on auth pages */}
      {!isAuthPage && (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
      )}

      {/* Navbar hidden on auth pages */}
      {!isAuthPage && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected app routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
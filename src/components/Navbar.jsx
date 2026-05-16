import { useContext, useState, useEffect, useRef } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"

export default function Navbar({ darkMode, setDarkMode }) {
  const { cart } = useContext(CartContext)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll && currentScroll > 80) setShow(false)
      else setShow(true)
      setLastScroll(currentScroll)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  // Close menu on outside click
  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  function handleLogout() {
    logout()
    setUserMenuOpen(false)
    navigate("/login")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full top-0 z-50 flex justify-center pt-4 px-4"
    >
      <div className="glass-panel w-full max-w-5xl flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-display font-bold cursor-pointer flex items-center gap-2 group"
        >
          <span className="group-hover:rotate-12 transition-transform duration-300">🍔</span>
          <span className="bg-gradient-to-r from-primary-light to-amber-400 bg-clip-text text-transparent">Foodio</span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="nav-link">Breakfast</li>
          <li className="nav-link">Lunch</li>
          <li className="nav-link">Dinner</li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative flex items-center">
            <motion.input
              initial={false}
              animate={{
                width: isSearchOpen ? 200 : 0,
                opacity: isSearchOpen ? 1 : 0,
                padding: isSearchOpen ? "8px 16px" : 0,
              }}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full outline-none text-sm dark:text-white"
              placeholder="Search..."
            />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="absolute right-2 text-xl hover:scale-110 transition-transform"
            >
              🔍
            </button>
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl hover:scale-110 transition-transform"
            title="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="text-2xl cursor-pointer relative hover:scale-110 transition-transform"
          >
            🛒
            {cart.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-glow font-bold"
              >
                {cart.length}
              </motion.span>
            )}
          </div>

          {/* User / Auth */}
          {user ? (
            <div ref={menuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 bg-white/10 dark:bg-white/5 border border-white/20 rounded-full px-3 py-1.5 text-sm font-medium hover:border-orange-400/50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                  {user.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <span className="hidden sm:inline text-slate-700 dark:text-white max-w-[80px] truncate">
                  {user.name}
                </span>
                <svg className={`w-3 h-3 text-slate-500 dark:text-white/50 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-white/20 dark:border-white/10 shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 dark:text-white/40 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white text-sm font-semibold shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:shadow-[0_0_24px_rgba(249,115,22,0.6)] transition-all duration-200"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
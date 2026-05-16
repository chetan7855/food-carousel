import { useState, useId } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

/* ─── tiny reusable icon components ─── */
function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function FloatingInput({ id, label, type = "text", value, onChange, error, rightAddon, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <div className={`
        relative flex items-center rounded-2xl border transition-all duration-300 bg-white/5
        ${error
          ? "border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
          : focused
            ? "border-orange-500/70 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
            : "border-white/10 hover:border-white/20"
        }
      `}>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={onChange}
          className="w-full bg-transparent px-4 pt-6 pb-2 text-white text-sm outline-none peer placeholder-transparent"
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none select-none
            ${lifted
              ? "top-2 text-[10px] font-semibold tracking-widest uppercase text-orange-400"
              : "top-4 text-sm text-white/40"
            }
          `}
        >
          {label}
        </label>
        {rightAddon && (
          <div className="absolute right-3 flex items-center">
            {rightAddon}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-1 text-xs text-red-400 flex items-center gap-1"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── particle background ─── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}));

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const uid = useId();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const from = location.state?.from?.pathname || "/";

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1400));
    try {
      login({ email: form.email, password: form.password, remember: form.remember });
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070711] px-4 py-12">

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-400/30 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-orange-500/50 via-pink-500/20 to-purple-500/30 blur-[2px]" />

        <div className="relative rounded-3xl bg-[#0e0e1a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] p-8 sm:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-[0_0_24px_rgba(249,115,22,0.5)]">
                <span className="text-xl">🔥</span>
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
                FoodFire
              </span>
            </motion.div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Welcome back 👋
            </h1>
            <p className="text-sm text-white/40">
              Sign in to continue your foodie journey
            </p>
          </div>

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2"
              >
                <span>⚠️</span> {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <FloatingInput
              id={`${uid}-email`}
              label="Email address"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((ev) => ({ ...ev, email: "" })); }}
              error={errors.email}
            />

            <FloatingInput
              id={`${uid}-password`}
              label="Password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((ev) => ({ ...ev, password: "" })); }}
              error={errors.password}
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-white/40 hover:text-orange-400 transition-colors duration-200 p-1"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPw} />
                </button>
              }
            />

            {/* Remember me & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setForm((f) => ({ ...f, remember: !f.remember }))}
                  className={`
                    relative w-10 h-5 rounded-full transition-all duration-300 cursor-pointer
                    ${form.remember ? "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]" : "bg-white/10"}
                  `}
                >
                  <motion.div
                    animate={{ x: form.remember ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors select-none">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`
                relative w-full py-3.5 rounded-2xl font-display font-semibold text-white text-sm tracking-wide overflow-hidden
                bg-gradient-to-r from-orange-500 to-pink-600
                shadow-[0_0_24px_rgba(249,115,22,0.4)] hover:shadow-[0_0_36px_rgba(249,115,22,0.6)]
                transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {/* Shimmer sweep */}
              {!loading && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              {loading ? (
                <span className="flex items-center justify-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing you in…
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30 font-medium">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social placeholders */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "G", label: "Google", bg: "from-red-500/10 to-orange-500/10" },
              { icon: "F", label: "Facebook", bg: "from-blue-500/10 to-cyan-500/10" },
            ].map(({ icon, label, bg }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => alert("Social login not configured — use email/password.")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-gradient-to-br ${bg} text-white/60 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-all duration-200`}
              >
                <span className="font-bold text-base">{icon}</span>
                {label}
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-white/30">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors"
            >
              Create one free →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

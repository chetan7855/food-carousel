import { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

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

function CheckIcon() {
  return (
    <motion.svg
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  );
}

function StrengthBar({ password }) {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Perfect"];
  const colors = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-400", "bg-emerald-500"];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i <= score ? 1 : 0.15 }}
            className={`h-1 flex-1 rounded-full origin-left transition-colors duration-300 ${i <= score ? colors[score] : "bg-white/10"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score <= 1 ? "text-red-400" : score <= 2 ? "text-yellow-400" : score <= 3 ? "text-blue-400" : "text-green-400"}`}>
        {labels[score]}
      </p>
    </div>
  );
}

function FloatingInput({ id, label, type = "text", value, onChange, error, rightAddon, autoComplete, hint }) {
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
          className="w-full bg-transparent px-4 pt-6 pb-2 text-white text-sm outline-none placeholder-transparent"
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
          <div className="absolute right-3 flex items-center">{rightAddon}</div>
        )}
      </div>
      {hint && !error && <p className="mt-1 ml-1 text-xs text-white/30">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-1 text-xs text-red-400 flex items-center gap-1"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}));

const REQUIREMENTS = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const uid = useId();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    else if (form.name.trim().length < 2) e.name = "Name too short";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!agreed) e.agreed = "You must accept the terms";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    try {
      signup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      setSuccess(true);
      await new Promise((r) => setTimeout(r, 1200));
      navigate("/", { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((ev) => ({ ...ev, [key]: "" }));
    },
    error: errors[key],
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070711] px-4 py-12">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[20%] w-[250px] h-[250px] rounded-full bg-pink-600/10 blur-[70px] pointer-events-none" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400/30 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#070711]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.5)]">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-white text-xl font-display font-bold">Account Created! 🎉</p>
              <p className="text-white/50 text-sm">Redirecting to your dashboard…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-purple-500/50 via-pink-500/20 to-orange-500/30 blur-[2px]" />

        <div className="relative rounded-3xl bg-[#0e0e1a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] p-8 sm:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2.5">
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
              Join the feast ✨
            </h1>
            <p className="text-sm text-white/40">
              Create your free account and start ordering
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
              id={`${uid}-name`}
              label="Full name"
              autoComplete="name"
              {...field("name")}
            />

            <FloatingInput
              id={`${uid}-email`}
              label="Email address"
              type="email"
              autoComplete="email"
              {...field("email")}
            />

            <div>
              <FloatingInput
                id={`${uid}-password`}
                label="Password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                {...field("password")}
                rightAddon={
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="text-white/40 hover:text-orange-400 transition-colors duration-200 p-1"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPw} />
                  </button>
                }
              />
              <StrengthBar password={form.password} />
              {/* Requirements checklist */}
              {form.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 space-y-1"
                >
                  {REQUIREMENTS.map(({ label, test }) => {
                    const ok = test(form.password);
                    return (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200
                          ${ok ? "bg-green-500 text-white" : "border border-white/20 text-transparent"}`}>
                          {ok && <CheckIcon />}
                        </div>
                        <span className={`text-xs transition-colors ${ok ? "text-green-400" : "text-white/30"}`}>{label}</span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            <FloatingInput
              id={`${uid}-confirm`}
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              {...field("confirmPassword")}
              rightAddon={
                <button type="button" onClick={() => setShowConfirm((v) => !v)}
                  className="text-white/40 hover:text-orange-400 transition-colors duration-200 p-1"
                  aria-label={showConfirm ? "Hide" : "Show"}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              }
            />

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => { setAgreed((v) => !v); setErrors((e) => ({ ...e, agreed: "" })); }}
                  className={`
                    mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200
                    ${agreed
                      ? "bg-orange-500 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                      : errors.agreed
                        ? "border-2 border-red-500/70"
                        : "border-2 border-white/20 hover:border-white/40"
                    }
                  `}
                >
                  {agreed && <CheckIcon />}
                </div>
                <span className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors select-none">
                  I agree to the{" "}
                  <a href="#" className="text-orange-400 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-400 hover:underline">Privacy Policy</a>
                </span>
              </label>
              <AnimatePresence>
                {errors.agreed && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-1.5 ml-1 text-xs text-red-400"
                  >
                    {errors.agreed}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`
                relative w-full py-3.5 rounded-2xl font-display font-semibold text-white text-sm tracking-wide overflow-hidden
                bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500
                shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_36px_rgba(168,85,247,0.6)]
                transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
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
                  Creating your account…
                </span>
              ) : (
                "Create Free Account 🚀"
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-white/30">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

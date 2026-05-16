import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Cart() {
  const { cart, clearCart, increaseQty, decreaseQty } = useContext(CartContext)
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [errors, setErrors] = useState({})

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price.replace("$", ""))
    return total + price * item.qty
  }, 0)

  const deliveryFee = cart.length > 0 ? 5 : 0
  const total = subtotal + deliveryFee

  const validate = () => {
    let newErrors = {}
    if (!/^[A-Za-z ]+$/.test(name)) newErrors.name = "Name should contain letters only"
    if (!/^[0-9]+$/.test(phone)) newErrors.phone = "Digits only allowed"
    if (address.length < 5) newErrors.address = "Enter valid address"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const placeOrder = () => {
    if (!validate()) return
    setOrderPlaced(true)
    clearCart()
  }

  const closePopup = () => {
    setOrderPlaced(false)
    navigate("/")
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="min-h-screen pt-32 px-4 pb-20 flex justify-center"
    >
      <div className="glass-panel w-full max-w-4xl p-8 md:p-12 shadow-2xl relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-end mb-10 border-b border-slate-300/30 pb-6 relative z-10">
          <h1 className="text-4xl font-display font-bold">
            <span className="bg-gradient-to-r from-primary-light to-amber-500 bg-clip-text text-transparent">Your Order</span>
          </h1>
          <button 
            onClick={() => navigate("/")}
            className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-primary-light transition-colors"
          >
            ← Keep Shopping
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {cart.length === 0 && !orderPlaced ? (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center py-12 opacity-60 text-lg font-medium"
                >
                  Your cart is empty. Time to add some delicious food! 🍔
                </motion.p>
              ) : (
                cart.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white/20 dark:bg-slate-800/40 rounded-2xl border border-white/40 dark:border-slate-700/50 backdrop-blur-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-24 h-24 object-cover rounded-xl shadow-md" alt={item.name} />
                      <div>
                        <h2 className="font-display font-bold text-xl mb-1">{item.name}</h2>
                        <p className="text-primary-light font-bold text-lg">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/30 dark:bg-slate-700/50 p-2 rounded-full border border-white/50 dark:border-slate-600/50">
                      <button onClick={() => decreaseQty(item.name)} className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-white/50 dark:hover:bg-slate-600 transition-colors font-bold">-</button>
                      <span className="w-6 text-center font-bold">{item.qty}</span>
                      <button onClick={() => increaseQty(item.name)} className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-white/50 dark:hover:bg-slate-600 transition-colors font-bold">+</button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Checkout Panel */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[350px] flex flex-col gap-8">
              {/* Summary */}
              <div className="bg-white/30 dark:bg-slate-800/60 p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 backdrop-blur-md shadow-lg">
                <h3 className="font-display font-bold text-xl mb-4">Summary</h3>
                <div className="space-y-3 mb-6 font-medium">
                  <div className="flex justify-between opacity-80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>Delivery</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-300/50 dark:border-slate-600/50 flex justify-between font-bold text-2xl">
                    <span>Total</span>
                    <span className="text-primary-light">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="font-display font-bold text-lg">Delivery Details</h3>
                  <div>
                    <input
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/50 dark:border-slate-600/50 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary-light/50 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <input
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/50 dark:border-slate-600/50 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary-light/50 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <input
                      placeholder="Delivery Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/50 dark:border-slate-600/50 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary-light/50 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1 ml-1">{errors.address}</p>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  className="mt-8 w-full bg-gradient-to-r from-primary-light to-amber-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.6)] transition-shadow"
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-panel p-12 text-center max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-4xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-amber-500">
                Success!
              </h2>
              <p className="text-lg opacity-80 mb-8">
                Your order is being prepared and will be delivered shortly.
              </p>
              <button
                onClick={closePopup}
                className="bg-primary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
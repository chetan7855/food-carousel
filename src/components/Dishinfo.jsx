import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { motion } from "framer-motion"

export default function DishInfo({ dish }) {
  const { addToCart } = useContext(CartContext)

  if (!dish.name) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={dish.name}
      className="max-w-md pr-0 md:pr-16"
    >
      <motion.h2 variants={itemVariants} className="text-4xl font-display font-bold text-primary-light drop-shadow-md">
        {dish.price}
      </motion.h2>

      <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-display font-bold mt-4 leading-tight">
        {dish.name}
      </motion.h1>

      <motion.p variants={itemVariants} className="mt-6 text-lg opacity-80 leading-relaxed">
        {dish.description}
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8 text-sm">
        <span className="glass-panel px-4 py-2 flex items-center gap-2 font-medium">🔥 {dish.calories}</span>
        <span className="glass-panel px-4 py-2 flex items-center gap-2 font-medium">💪 {dish.protein}</span>
        <span className="glass-panel px-4 py-2 flex items-center gap-2 font-medium">⏱️ {dish.prepTime}</span>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-10">
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <span className="text-primary-light">🥬</span> Ingredients
        </h3>
        <div className="flex flex-wrap gap-2">
          {dish.ingredients.map((item, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-white/20 dark:bg-slate-700/50 rounded-md border border-white/30 dark:border-slate-600/50 text-sm backdrop-blur-md"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249,115,22,0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => addToCart(dish)}
        className="mt-10 bg-gradient-to-r from-primary-light to-amber-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all"
      >
        Add To Order
      </motion.button>
    </motion.div>
  )
}
import { dishes } from "../data/dishes"
import { motion } from "framer-motion"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function FoodSection({ title, category }) {
  const filtered = dishes.filter(d => d.category === category)
  const { addToCart } = useContext(CartContext)

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <section className="py-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-display font-bold mb-10"
      >
        {title}
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {filtered.map((dish, index) => (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            key={index}
            className="neumorphic-card p-6 flex flex-col group relative overflow-hidden"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary-light/0 group-hover:bg-primary-light/5 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="relative h-48 mb-6 flex justify-center items-center">
              <motion.img
                src={dish.image}
                className="w-40 h-40 object-cover rounded-full shadow-2xl group-hover:rotate-6 transition-transform duration-500"
                alt={dish.name}
              />
            </div>

            <h3 className="text-xl font-bold font-display mb-2">{dish.name}</h3>
            
            <p className="text-sm opacity-70 mb-4 line-clamp-2">{dish.description}</p>
            
            <div className="mt-auto flex justify-between items-center">
              <p className="text-primary-light dark:text-primary-dark font-bold text-2xl">
                {dish.price}
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(dish)}
                className="bg-primary-light hover:bg-primary-dark text-white p-3 rounded-full shadow-lg shadow-primary-light/30 transition-colors"
                title="Add to Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
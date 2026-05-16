import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DishInfo from "../components/Dishinfo"
import DishCarousel from "../components/DishCarousel"
import FoodSection from "../components/FoodSection"
import { dishes } from "../data/dishes"

export default function Home() {
  const [dish, setDish] = useState({})
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    })
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect();
  }, [])

  const categories = ["all", "breakfast", "lunch", "dinner"]

  // Determine which dishes to show in "Recommended for You" based on active dish or random
  const recommendedDishes = dishes.filter(d => d.name !== dish.name).slice(0, 3)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto pt-32 px-4 pb-20"
    >
      {/* Hero Section */}
      <div className="flex justify-center items-center mb-24">
        <div className="glass-panel w-full p-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <DishInfo dish={dish} />
          <DishCarousel setDish={setDish} />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex justify-center gap-4 mb-16 overflow-x-auto py-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
              activeCategory === cat 
                ? "bg-primary-light text-white shadow-glow" 
                : "bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-700/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommended Section */}
      <section className="mb-24 reveal">
        <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
          <span className="text-primary-light">✨</span> Recommended for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedDishes.map((d, i) => (
             <div
             key={i}
             className="neumorphic-card p-6 flex flex-col items-center text-center cursor-pointer hover:-translate-y-2 group"
             onClick={() => setDish(d)}
           >
             <motion.img
               src={d.image}
               className="w-40 h-40 object-cover rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl"
               alt={d.name}
             />
             <h3 className="text-xl font-bold mb-2">{d.name}</h3>
             <p className="text-primary-light font-bold text-xl">{d.price}</p>
           </div>
          ))}
        </div>
      </section>

      {/* Main Food Sections */}
      <div className="space-y-24">
        {(activeCategory === "all" || activeCategory === "breakfast") && (
          <FoodSection title="🌅 Breakfast Specials" category="breakfast" />
        )}
        
        {(activeCategory === "all" || activeCategory === "lunch") && (
          <FoodSection title="☀️ Lunch Favorites" category="lunch" />
        )}
        
        {(activeCategory === "all" || activeCategory === "dinner") && (
          <FoodSection title="🌙 Dinner Delights" category="dinner" />
        )}
      </div>

      <footer className="mt-32 text-center py-10 border-t border-slate-300/50 dark:border-slate-700/50">
        <p className="text-lg font-medium opacity-80">
          Made with ❤️ for food lovers
        </p>
      </footer>
    </motion.div>
  )
}
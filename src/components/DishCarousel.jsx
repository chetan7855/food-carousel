import { useState, useEffect } from "react"
import { dishes } from "../data/dishes"
import { motion, AnimatePresence } from "framer-motion"

export default function DishCarousel({ setDish }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  useEffect(() => {
    setDish(dishes[index])
  }, [index, setDish])

  const nextDish = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % dishes.length)
  }

  const prevDish = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + dishes.length) % dishes.length)
  }

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8,
        rotate: direction > 0 ? 45 : -45
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8,
        rotate: direction < 0 ? 45 : -45
      }
    }
  }

  return (
    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-4 rounded-full border border-white/20 shadow-[0_0_50px_rgba(249,115,22,0.15)] animate-pulse pointer-events-none"></div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={dishes[index].image}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            rotate: { duration: 0.5, ease: "easeOut" }
          }}
          className="absolute w-[80%] object-contain drop-shadow-2xl"
          alt={dishes[index].name}
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevDish}
          className="pointer-events-auto -ml-4 w-12 h-12 flex items-center justify-center rounded-full glass-panel text-2xl shadow-lg hover:shadow-glow transition-shadow z-10 text-slate-800 dark:text-white"
        >
          ←
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextDish}
          className="pointer-events-auto -mr-4 w-12 h-12 flex items-center justify-center rounded-full glass-panel text-2xl shadow-lg hover:shadow-glow transition-shadow z-10 text-slate-800 dark:text-white"
        >
          →
        </motion.button>
      </div>
    </div>
  )
}
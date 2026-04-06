import { useState, useEffect } from "react"
import { dishes } from "../data/dishes"
import { motion } from "framer-motion"

export default function DishCarousel({ setDish }) {

const [index,setIndex] = useState(0)

useEffect(()=>{
setDish(dishes[index])
},[index])

const nextDish=()=>{
setIndex((prev)=>(prev+1)%dishes.length)
}

const prevDish=()=>{
setIndex((prev)=>(prev-1+dishes.length)%dishes.length)
}

return(

<div className="relative w-[450px] h-[450px] flex items-center justify-center">

<motion.img
key={dishes[index].image}
src={dishes[index].image}
className="w-[300px] float"
initial={{scale:0.7,opacity:0}}
animate={{scale:1,opacity:1}}
transition={{duration:0.5}}
/>

<button
onClick={prevDish}
className="absolute left-[-40px] bg-white/40 backdrop-blur-md shadow-xl rounded-full px-4 py-2 text-xl hover:scale-110 transition"
>

←

</button>

<button
onClick={nextDish}
className="absolute right-[-40px] bg-white/40 backdrop-blur-md shadow-xl rounded-full px-4 py-2 text-xl hover:scale-110 transition"
>

→

</button>

</div>

)
}
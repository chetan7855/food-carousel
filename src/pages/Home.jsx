import {useState,useEffect} from "react"
import Navbar from "../components/Navbar"
import DishInfo from "../components/Dishinfo"
import DishCarousel from "../components/DishCarousel"
import FoodSection from "../components/FoodSection"

export default function Home(){

const [dish,setDish] = useState({})

useEffect(()=>{

const reveals = document.querySelectorAll(".reveal")

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active")
}
})

})

reveals.forEach(el=>observer.observe(el))

},[])

return(

<div className="max-w-[1400px] mx-auto pt-28">

<Navbar/>

<div className="flex justify-center items-center pb-24">

<div className="glass-hero flex justify-between items-center px-20 py-16 w-full">

<DishInfo dish={dish}/>
<DishCarousel setDish={setDish}/>

</div>

</div>

<FoodSection title="Breakfast Specials" category="breakfast"/>

<FoodSection title="Lunch Favorites" category="lunch"/>

<FoodSection title="Dinner Delights" category="dinner"/>


<footer className="text-center py-20 text-lg font-semibold">

Thank you for visiting our food store ❤️  
We hope you enjoy our delicious meals!

</footer>

</div>

)
}
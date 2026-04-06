import {useContext,useState,useEffect} from "react"
import {CartContext} from "../context/CartContext"
import {useNavigate} from "react-router-dom"

export default function Navbar(){

const {cart} = useContext(CartContext)
const navigate = useNavigate()

const [show,setShow] = useState(true)
const [lastScroll,setLastScroll] = useState(0)

useEffect(()=>{

const handleScroll = ()=>{

const currentScroll = window.scrollY

if(currentScroll > lastScroll && currentScroll > 80){
setShow(false)
}else{
setShow(true)
}

setLastScroll(currentScroll)

}

window.addEventListener("scroll",handleScroll)

return ()=>window.removeEventListener("scroll",handleScroll)

},[lastScroll])

return(

<nav
className={`flex justify-between items-center px-16 py-6 backdrop-blur-lg bg-white/30 border-b border-white/40 shadow-md fixed w-full top-0 z-50 transition-transform duration-300 ${
show ? "translate-y-0" : "-translate-y-full"
}`}
>

<div className="text-2xl font-bold">
🍴
</div>

<ul className="flex gap-10 text-lg font-medium">

<li>Breakfast</li>
<li>Lunch</li>
<li>Dinner</li>

</ul>

<div
onClick={()=>navigate("/cart")}
className="text-xl cursor-pointer relative"
>

🛒

{cart.length>0 &&(

<span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">

{cart.length}

</span>

)}

</div>

</nav>

)
}
import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart(){

const {cart,clearCart,increaseQty,decreaseQty} = useContext(CartContext)

const navigate = useNavigate()

const [orderPlaced,setOrderPlaced] = useState(false)

const [name,setName] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")

const [errors,setErrors] = useState({})


const subtotal = cart.reduce((total,item)=>{

const price = Number(item.price.replace("$",""))

return total + price * item.qty

},0)

const deliveryFee = cart.length > 0 ? 5 : 0

const total = subtotal + deliveryFee

const validate = ()=>{

let newErrors={}

if(!/^[A-Za-z ]+$/.test(name)){
newErrors.name="Name should contain letters only"
}

if(!/^[0-9]+$/.test(phone)){
newErrors.phone="Digits only allowed"
}

if(address.length < 5){
newErrors.address="Enter valid address"
}

setErrors(newErrors)

return Object.keys(newErrors).length===0
}

const placeOrder = ()=>{

if(!validate()) return

setOrderPlaced(true)

clearCart()

}

const closePopup = ()=>{

setOrderPlaced(false)

navigate("/")

}

return(

<div className="min-h-screen flex items-center justify-center px-6">


<div className="glass-card w-[700px] p-10">

<h1 className="text-4xl font-bold mb-8 text-center">

Your Cart

</h1>


<div className="space-y-6 mb-8">

{cart.map((item,index)=>(

<div key={index} className="flex items-center justify-between">

<div className="flex items-center gap-4">

<img
src={item.image}
className="w-20 h-20 object-cover rounded-lg"
/>

<div>

<h2 className="font-semibold text-lg">

{item.name}

</h2>

<p className="text-orange-500 font-bold">

{item.price}

</p>

<p className="text-sm text-gray-500">

Subtotal: $

{Number(item.price.replace("$","")) * item.qty}

</p>

</div>

</div>


<div className="flex items-center gap-3">

<button
onClick={()=>decreaseQty(item.name)}
className="bg-gray-200 px-3 py-1 rounded"
>

-

</button>

<span>{item.qty}</span>

<button
onClick={()=>increaseQty(item.name)}
className="bg-gray-200 px-3 py-1 rounded"
>

+

</button>

</div>

</div>

))}

</div>

<div className="border-t pt-6 mb-8">

<div className="flex justify-between mb-2">

<span>Subtotal</span>

<span>${subtotal}</span>

</div>

<div className="flex justify-between mb-2">

<span>Delivery</span>

<span>${deliveryFee}</span>

</div>

<div className="flex justify-between font-bold text-lg">

<span>Total</span>

<span>${total}</span>

</div>

</div>


<h2 className="text-xl font-semibold mb-4">

Delivery Details

</h2>

<div className="space-y-3">

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border rounded-lg p-2"
/>

{errors.name && (
<p className="text-red-500 text-sm">{errors.name}</p>
)}

<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full border rounded-lg p-2"
/>

{errors.phone && (
<p className="text-red-500 text-sm">{errors.phone}</p>
)}

<input
placeholder="Delivery Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="w-full border rounded-lg p-2"
/>

{errors.address && (
<p className="text-red-500 text-sm">{errors.address}</p>
)}

</div>

<button
onClick={placeOrder}
className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition"
>

Place Order

</button>

<button
onClick={()=>navigate("/")}
className="mt-4 w-full border border-gray-400 py-3 rounded-full hover:bg-gray-100 transition"
>

Back to Menu

</button>

</div>

{orderPlaced && (

<div
onClick={closePopup}
className="fixed inset-0 flex items-center justify-center bg-black/40"
>

<div
className="glass-popup p-10 text-center"
onClick={(e)=>e.stopPropagation()}
>

<h2 className="text-3xl font-bold mb-4">

Thank You! 🎉

</h2>

<p className="text-gray-700">

Your order has been placed successfully.

</p>

<p className="text-sm mt-4 text-gray-500">

Click anywhere to continue

</p>

</div>

</div>

)}

</div>

)

}
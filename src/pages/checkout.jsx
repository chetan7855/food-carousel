import {useLocation} from "react-router-dom"

export default function Checkout(){

const location = useLocation()
const dish = location.state

return(

<div className="p-10">

<h1 className="text-4xl font-bold mb-6">Order Details</h1>

<img
src={dish.image}
className="w-64 mb-4"
/>

<h2 className="text-2xl font-bold">{dish.name}</h2>

<p className="text-xl text-orange-500">{dish.price}</p>

<h3 className="mt-6 text-xl font-semibold">Delivery Address</h3>

<input
placeholder="Full Name"
className="border p-2 block mt-2"
/>

<input
placeholder="Phone Number"
className="border p-2 block mt-2"
/>

<input
placeholder="Address"
className="border p-2 block mt-2"
/>

<button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full">
Place Order
</button>

</div>

)

}
import {useContext} from "react"
import {CartContext} from "../context/CartContext"

export default function DishInfo({dish}){

const {addToCart} = useContext(CartContext)

if(!dish.name) return null

return(

<div className="max-w-md pr-16">

<h2 className="text-3xl font-bold text-orange-500">
{dish.price}
</h2>

<h1 className="text-5xl font-bold mt-3">
{dish.name}
</h1>

<p className="mt-4 text-gray-600">
{dish.description}
</p>

<div className="flex gap-4 mt-4 text-sm text-gray-700">

<span>🔥 {dish.calories}</span>
<span>💪 {dish.protein} protein</span>
<span>⏱ {dish.prepTime}</span>

</div>

<h3 className="mt-6 font-semibold text-lg">
Ingredients
</h3>

<ul className="list-disc ml-5 text-gray-600">

{dish.ingredients.map((item,index)=>(
<li key={index}>{item}</li>
))}

</ul>

<button
onClick={()=>addToCart(dish)}
className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full"
>

Add To Cart

</button>

</div>

)

}
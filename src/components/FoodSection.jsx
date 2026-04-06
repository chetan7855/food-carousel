import { dishes } from "../data/dishes"

export default function FoodSection({title,category}){

const filtered = dishes.filter(d=>d.category===category)

return(

<section className="py-20 px-20 reveal">

<h2 className="text-4xl font-bold mb-12">

{title}

</h2>

<div className="grid grid-cols-3 gap-10">

{filtered.map((dish,index)=>(

<div
key={index}
className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl hover:scale-105 transition"
>

<img
src={dish.image}
className="w-full h-40 object-cover rounded-xl"
/>

<h3 className="mt-4 text-xl font-semibold">

{dish.name}

</h3>

<p className="text-orange-500 font-bold">

{dish.price}

</p>

</div>

))}

</div>

</section>

)
}
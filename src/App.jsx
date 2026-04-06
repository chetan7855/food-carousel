import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"

function App(){

return(

<div className="min-h-screen bg-gradient-to-b from-[#f6efe7] to-[#efe4d8]">

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/cart" element={<Cart/>}/>

</Routes>

</div>

)

}

export default App
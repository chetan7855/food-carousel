import {createContext,useState} from "react"

export const CartContext = createContext()

export const CartProvider = ({children}) => {

const [cart,setCart] = useState([])

const addToCart = (dish)=>{

const existing = cart.find(item=>item.name===dish.name)

if(existing){

setCart(cart.map(item =>
item.name === dish.name
? {...item, qty:item.qty+1}
: item
))

}else{

setCart([...cart,{...dish,qty:1}])

}

}

const increaseQty = (name)=>{

setCart(cart.map(item =>
item.name===name
? {...item,qty:item.qty+1}
: item
))

}

const decreaseQty = (name)=>{

setCart(cart
.map(item =>
item.name===name
? {...item,qty:item.qty-1}
: item
)
.filter(item => item.qty > 0)
)

}

const clearCart = ()=>{

setCart([])

}

return(

<CartContext.Provider
value={{cart,addToCart,increaseQty,decreaseQty,clearCart}}
>

{children}

</CartContext.Provider>

)

}

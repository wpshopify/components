import React, { useReducer, useContext } from 'react'
import { CartInitialState } from './initial-state'
import { CartContext } from './context'
import { CartReducer } from './reducer'
import { CartButtons } from './buttons'
import { CartBody } from './body'

function Cart(props) {
   const [state, dispatch] = useReducer(CartReducer, CartInitialState(props))

   return (
      <>
         <CartContext.Provider
            value={{
               cartState: state,
               cartDispatch: dispatch
            }}>
            {props.children}
         </CartContext.Provider>
      </>
   )
}

export { Cart, CartBody, CartButtons }

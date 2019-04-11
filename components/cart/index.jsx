import React, { useReducer, useContext } from 'react'
import { CartInitialState } from './initial-state'
import { CartContext } from './context'
import { CartReducer } from './reducer'
import { CartButtons } from './buttons'
import { CartBody } from './body'

function Cart({ options }) {
   const [state, dispatch] = useReducer(CartReducer, CartInitialState(options))

   return (
      <>
         <CartContext.Provider
            value={{
               cartState: state,
               cartDispatch: dispatch
            }}>
            <CartButtons />
            <CartBody />
         </CartContext.Provider>
      </>
   )
}

export { Cart, CartBody, CartButtons }

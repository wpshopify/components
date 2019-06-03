import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'

function CartTerms() {
   const [shopState] = useContext(ShopContext)
   const [cartState, cartDispatch] = useContext(CartContext)
   const [isChecked, setIsChecked] = useState(false)

   useEffect(() => {
      cartDispatch({ type: 'SET_TERMS_ACCEPTED', payload: false })
   }, [])

   function termsLabel() {
      return {
         __html: shopState.settings.cart.cartTermsContent
      }
   }

   function onChange(e) {
      setIsChecked(!isChecked)
      cartDispatch({ type: 'SET_TERMS_ACCEPTED', payload: !isChecked })
   }

   return (
      <section className='wps-cart-terms container'>
         <div className='wps-input-row row'>
            <input onChange={onChange} id='wps-input-terms' defaultChecked={isChecked} type='checkbox' className='wps-input wps-input-checkbox' />
            <label dangerouslySetInnerHTML={termsLabel()} htmlFor='wps-input-terms' className='col-11 wps-input-label wps-input-terms' />
         </div>
      </section>
   )
}

export { CartTerms }

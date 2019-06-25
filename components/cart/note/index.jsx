import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { useDebounce } from 'use-debounce'

function CartNote() {
   const [shopState, shopDispatch] = useContext(ShopContext)
   const [noteValue, setNoteValue] = useState('')
   const [debouncedValue] = useDebounce(noteValue, 250)
   const isFirstRender = useRef(true)

   function onChange(e) {
      setNoteValue(e.target.value)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (wp.hooks) {
         wp.hooks.doAction('on.checkout.note', debouncedValue)
      }

      shopDispatch({ type: 'SET_CHECKOUT_NOTE', payload: debouncedValue })
   }, [debouncedValue])

   return (
      <section className='wps-cart-notes'>
         <label value='Checkout notes' htmlFor='wps-input-notes'>
            Notes:
         </label>
         <textarea placeholder={shopState.settings.cart.cartNotesPlaceholder} id='wps-input-notes' className='wps-input wps-input-textarea' onChange={onChange} />
      </section>
   )
}

export { CartNote }

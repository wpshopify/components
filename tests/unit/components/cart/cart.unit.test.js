import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Shop } from '../../../../components/shop'
import { Cart, CartBody, CartButtons } from '../../../../components/cart'

function cartButtonOptions() {
   return [
      {
         type: 'fixed',
         dropzone: document.getElementById('wps-cart-icon-fixed')
      }
   ]
}

function renderCart(props) {
   // Needed because <CartButton> requires a dropzone
   render(<div id='wps-cart-icon-fixed' />)

   const queries = render(
      <Shop>
         <Cart>
            <CartButtons options={cartButtonOptions()} />
            <CartBody />
         </Cart>
      </Shop>
   )

   const cartNotice = queries.getByText(/Your cart is empty 🛒/i)
   const cartButtons = queries.getByRole('button')

   return { ...queries, cartNotice, cartButtons }
}

afterEach(cleanup)

it('Should render an empty <Cart />', () => {
   const { cartNotice } = renderCart()
   expect(cartNotice).toBeInTheDocument()
})

it('Should render the fixed cart icon', () => {
   const { cartButtons } = renderCart()
   expect(cartButtons).toBeInTheDocument()
})

import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Shop } from '../../../../components/shop'
import { Cart } from '../../../../components/cart'

function renderCart(props) {
   // Needed because <CartButton> requires a dropzone
   render(<div id='wps-cart-button-fixed' />)

   const queries = render(
      <Shop>
         <Cart />
      </Shop>
   )

   const cartNotice = queries.getByText(/Your cart is empty 🛒/i)
   const cartButtonFixed = queries.getByRole('button')

   return { ...queries, cartNotice, cartButtonFixed }
}

afterEach(cleanup)

it('Should render an empty <Cart />', () => {
   const { cartNotice } = renderCart()
   expect(cartNotice).toBeInTheDocument()
})

it('Should render the fixed cart icon', () => {
   const { cartButtonFixed } = renderCart()
   expect(cartButtonFixed).toBeInTheDocument()
})

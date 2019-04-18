import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Shop } from '../../../../components/shop'
import { Cart, CartBody, CartButtons } from '../../../../components/cart'

function cartButtonOptions() {
   return [
      {
         componentID: '5cad64a8a1878',
         componentOptions: {
            type: false,
            icon_color: '#ddd',
            counter_background_color: '#000',
            counter_text_color: '#fff',
            render_from_server: false
         },
         componentOptionsId: 'ed1c77f041d947e17caafefdcad39384ed1c77f041d947e17caafefdcad39384',
         element: document.querySelectorAll('#wps-cart-icon-fixed')[0],
         excludes: false,
         gid: false,
         renderFromServer: true
      }
   ]
}

function renderCart(props) {
   // Needed because <CartButton> requires a dropzone
   render(<div id='wps-cart-icon-fixed' />)

   const queries = render(
      <Shop>
         <Cart options={cartButtonOptions()} />
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

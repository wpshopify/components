import React, { useContext } from 'react'
import { CartButtonContext } from '../button/_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { useAction } from '../../../../common/hooks'
import has from 'lodash/has'

function CartIcon() {
   const [cartButtonState] = useContext(CartButtonContext)
   const [shopState] = useContext(ShopContext)

   function getIconColor() {
      if (cartButtonState.componentOptions.type === 'fixed') {
         return shopState.settings.cart.colorCartIconFixed
      }

      return cartButtonState.componentOptions.iconColor
   }

   function iconStyles() {
      return {
         fill: getIconColor()
      }
   }

   return (
      <>
         {cartButtonState.componentOptions.icon ? (
            <img src={cartButtonState.componentOptions.icon} className='wps-icon wps-icon-cart lazyload' />
         ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='wps-icon wps-icon-cart' viewBox='0 0 25 25' enableBackground='new 0 0 25 25'>
               <g style={iconStyles()}>
                  <path d='M24.6 3.6c-.3-.4-.8-.6-1.3-.6h-18.4l-.1-.5c-.3-1.5-1.7-1.5-2.5-1.5h-1.3c-.6 0-1 .4-1 1s.4 1 1 1h1.8l3 13.6c.2 1.2 1.3 2.4 2.5 2.4h12.7c.6 0 1-.4 1-1s-.4-1-1-1h-12.7c-.2 0-.5-.4-.6-.8l-.2-1.2h12.6c1.3 0 2.3-1.4 2.5-2.4l2.4-7.4v-.2c.1-.5-.1-1-.4-1.4zm-4 8.5v.2c-.1.3-.4.8-.5.8h-13l-1.8-8.1h17.6l-2.3 7.1z' />
                  <circle cx='9' cy='22' r='2' />
                  <circle cx='19' cy='22' r='2' />
               </g>
            </svg>
         )}
      </>
   )
}

export { CartIcon }

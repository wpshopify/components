import React, { useContext, useRef, useEffect, useState } from 'react'
import { ProductBuyButtonContext } from '../_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductsContext } from '../../../_state/context'

import { useAnime, pulse } from '../../../../../common/animations'
import { addProductDetailsToVariant } from '../../../../../common/products'
import { findVariantFromSelectedOptions } from '@wpshopify/api'

function ProductAddButton() {
   const button = useRef()
   const isFirstRender = useRef(false)
   const animePulse = useAnime(pulse)

   const [productsState] = useContext(ProductsContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [shopState, shopDispatch] = useContext(ShopContext)

   const buttonStyle = {
      backgroundColor: productsState.componentOptions.buttonColor
   }

   async function handleClick() {
      // check if all options are selected
      // if some are not selected, highlight them / shake them
      if (!buyButtonState.allOptionsSelected) {
         // setMissingSelections(true);
         buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      } else {
         buyButtonDispatch({ type: 'SET_IS_ADDING_TO_CART', payload: true })

         const variant = findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions)
         const lineItem = { variantId: variant.id, quantity: buyButtonState.quantity }
         const modVariant = addProductDetailsToVariant(variant, buyButtonState.product)

         shopDispatch({
            type: 'UPDATE_LINE_ITEMS_AND_VARIANTS',
            payload: {
               checkoutID: shopState.checkout.id,
               lineItems: [lineItem],
               variants: [modVariant]
            }
         })

         shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })

         shopDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })

         buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
         buyButtonDispatch({ type: 'SET_IS_ADDING_TO_CART', payload: false })
         buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

         shopDispatch({ type: 'NOTIFY_CART', payload: true })
      }
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (buyButtonState.allOptionsSelected) {
         animePulse(button.current)
      }
   }, [buyButtonState.allOptionsSelected])

   return (
      <div className='wps-component wps-component-products-add-button wps-btn-wrapper' data-wps-is-component-wrapper data-wps-product-id={buyButtonState.product.id} data-wps-post-id=''>
         <button
            ref={button}
            type='button'
            itemProp='potentialAction'
            itemScope
            itemType='https://schema.org/BuyAction'
            href='#!'
            className='wps-btn wps-add-to-cart'
            title={buyButtonState.product.title}
            data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
            data-wps-is-adding={buyButtonState.isAdding ? '1' : '0'}
            disabled={buyButtonState.isAdding ? true : false}
            onClick={handleClick}
            style={buttonStyle}>
            {buyButtonState.isAdding ? 'Adding ...' : productsState.componentOptions.buttonText ? productsState.componentOptions.buttonText : 'Add to cart'}
         </button>
      </div>
   )
}

export { ProductAddButton }
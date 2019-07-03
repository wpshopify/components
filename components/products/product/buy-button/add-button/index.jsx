import React, { useContext, useRef, useEffect } from 'react'
import { ProductBuyButtonContext } from '../_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductContext } from '../../_state/context'

import { toggleCart } from '../../../../../common/cart'
import { useAnime, pulse } from '../../../../../common/animations'
import { addProductDetailsToVariant } from '../../../../../common/products'
import { findVariantFromSelectedOptions } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

function ProductAddButton() {
   const button = useRef()
   const isFirstRender = useRef(false)
   const animePulse = useAnime(pulse)

   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [shopState, shopDispatch] = useContext(ShopContext)

   const buttonStyle = {
      backgroundColor: itemsState.componentOptions.addToCartButtonColor
   }

   function findVariantFromSelections() {
      return findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions)
   }

   function findSingleVariantFromPayload() {
      return buyButtonState.product.variants[0]
   }

   async function handleClick(e) {
      e.preventDefault()

      // check if all options are selected
      // if some are not selected, highlight them / shake them
      if (!buyButtonState.allOptionsSelected && productState.hasManyVariants) {
         buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      } else {
         if (productState.hasManyVariants) {
            var variant = findVariantFromSelections()
         } else {
            var variant = findSingleVariantFromPayload()
         }
         // const variant = findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions)
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
         // shopDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })

         buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
         buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

         toggleCart(true)

         if (wp.hooks) {
            wp.hooks.doAction('after.product.addToCart', lineItem, modVariant)
         }
      }
   }

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (buyButtonState.allOptionsSelected) {
         if (wp.hooks) {
            wp.hooks.doAction('before.product.addToCart')
         }

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
            className='wps-btn wps-btn-secondary wps-add-to-cart'
            title={buyButtonState.product.title}
            data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
            onClick={handleClick}
            style={buttonStyle}>
            {itemsState.componentOptions.addToCartButtonText ? itemsState.componentOptions.addToCartButtonText : 'Add to cart'}
         </button>
      </div>
   )
}

export { ProductAddButton }

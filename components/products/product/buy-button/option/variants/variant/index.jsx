import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProductOptionContext } from '../../_state/context'
import { ShopContext } from '../../../../../../shop/_state/context'
import { ProductBuyButtonContext } from '../../../_state/context'
import { ProductContext } from '../../../../_state/context'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { createObj, hasHooks } from '../../../../../../../common/utils'

function ProductVariant({ variant }) {
   const [isSelectable, setIsSelectable] = useState(true)
   const isFirstRender = useRef(true)

   const [shopState, shopDispatch] = useContext(ShopContext)
   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [productState, productDispatch] = useContext(ProductContext)

   function onVariantSelection() {
      const selectedVariant = createObj(productOptionState.option.name, variant.value)

      // setSelectedOptions(optionsUpdated);
      buyButtonDispatch({ type: 'UPDATE_SELECTED_OPTIONS', payload: selectedVariant })
      productDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
      productOptionDispatch({ type: 'SET_IS_OPTION_SELECTED', payload: true })
      productOptionDispatch({ type: 'SET_SELECTED_OPTION', payload: selectedVariant })

      hasHooks() && wp.hooks.doAction('on.product.variant.selection', selectedVariant, productOptionState)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      var variantToCheck = createObj(productOptionState.option.name, variant.value)
      var variantIsSelected = find(buyButtonState.availableVariants, variantToCheck)

      if (variantIsSelected === undefined) {
         setIsSelectable(false)
      } else {
         setIsSelectable(true)
      }
   }, [buyButtonState.availableVariants])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (isEmpty(buyButtonState.selectedOptions)) {
         setIsSelectable(true)
      }
   }, [buyButtonState.selectedOptions])

   return (
      <li itemProp='category' className='wps-product-variant wps-product-style wps-modal-close-trigger' onClick={onVariantSelection} data-wps-is-selectable={isSelectable}>
         {variant.value}
      </li>
   )
}

export { ProductVariant }

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProductOptionContext } from '../../_state/context'
import { ProductBuyButtonContext } from '../../../_state/context'
import update from 'immutability-helper'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { createObj } from '../../../../../../../common/utils'

function updateExistingSelections(selectedOptions, newSelectionObj) {
   return update(selectedOptions, { $merge: newSelectionObj })
}

function ProductVariant({ variant }) {
   const [isSelectable, setIsSelectable] = useState(true)
   const isFirstRender = useRef(true)

   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)

   function onVariantSelection() {
      const newlySelected = createObj(productOptionState.option.name, variant.value)

      // setSelectedOptions(optionsUpdated);
      buyButtonDispatch({ type: 'UPDATE_SELECTED_OPTIONS', payload: newlySelected })

      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: !productOptionState.isDropdownOpen })
      productOptionDispatch({ type: 'SET_IS_OPTION_SELECTED', payload: true })
      productOptionDispatch({ type: 'SET_SELECTED_OPTION', payload: newlySelected })
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
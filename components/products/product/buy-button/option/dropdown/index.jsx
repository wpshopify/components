import React, { useContext, useEffect, useRef } from 'react'
import { ProductVariants } from '../variants'
import { ProductBuyButtonContext } from '../../_state/context'
import { ProductOptionContext } from '../_state/context'
import { ProductOptionTrigger } from '../trigger'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

function ProductOptionDropdown() {
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
   const isFirstRender = useRef(true)

   // When buyButtonState.availableVariants changes ...
   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      var optionIsAvailable = find(buyButtonState.availableVariants, productOptionState.selectedOption)

      if (optionIsAvailable === undefined) {
         productOptionDispatch({ type: 'SET_IS_OPTION_SELECTED', payload: false })
         buyButtonDispatch({ type: 'UNSET_SELECTED_OPTIONS', payload: productOptionState.option.name })
      }
   }, [buyButtonState.availableVariants])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (isEmpty(buyButtonState.selectedOptions)) {
         productOptionDispatch({ type: 'SET_IS_OPTION_SELECTED', payload: false })
      }
   }, [buyButtonState.selectedOptions])

   return (
      <div className='wps-row'>
         <div className='wps-btn-dropdown wps-col wps-col-12' data-wps-is-selected={productOptionState.isOptionSelected} ref={productOptionState.dropdownElement}>
            <ProductOptionTrigger />
            <ProductVariants />
         </div>
      </div>
   )
}

export { ProductOptionDropdown }
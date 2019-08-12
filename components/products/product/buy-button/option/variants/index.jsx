import React, { useRef, useEffect, useContext } from 'react'
import { ProductVariant } from './variant'
import { ProductBuyButtonContext } from '../../_state/context'
import { ProductOptionContext } from '../_state/context'
import { ProductContext } from '../../../_state/context'
import { useOnClickOutside } from '../../../../../../common/hooks'

function ProductVariants() {
   const isFirstRender = useRef(true)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
   const [productState, productDispatch] = useContext(ProductContext)

   function isDropdownOpen() {
      return productOptionState.isDropdownOpen
   }

   useOnClickOutside(
      productOptionState.dropdownElement,
      () => {
         productDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
         productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
      },
      isDropdownOpen
   )

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      buyButtonDispatch({ type: 'SET_AVAILABLE_VARIANTS', payload: productOptionState.selectedOption })
   }, [productOptionState.selectedOption])

   return (
      <ul className='wps-modal wps-variants' data-wps-modal-is-open={productOptionState.isDropdownOpen}>
         {productOptionState.option.values.map(optionValue => (
            <ProductVariant key={optionValue.value} variant={optionValue} />
         ))}
      </ul>
   )
}

export { ProductVariants }

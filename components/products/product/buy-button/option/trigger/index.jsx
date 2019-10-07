import React, { useEffect, useContext, useRef } from 'react'
import { ProductBuyButtonContext } from '../../_state/context'
import { useAnime, pulse } from '../../../../../../common/animations'
import { hasHooks } from '../../../../../../common/utils'
import { ShopContext } from '../../../../../shop/_state/context'
import { ItemsContext } from '../../../../../items/_state/context'
import { ProductOptionContext } from '../_state/context'
import { ProductContext } from '../../../_state/context'

function ProductOptionTrigger() {
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
   const [productState, productDispatch] = useContext(ProductContext)
   const dropdownTrigger = useRef()
   const animePulse = useAnime(pulse)
   const isFirstRender = useRef(true)

   function onClick() {
      hasHooks() && wp.hooks.doAction('before.product.variantDropdown.toggle', productOptionState)

      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: !productOptionState.isDropdownOpen })
      productDispatch({ type: 'TOGGLE_DROPDOWN', payload: !productState.isDropdownOpen })
   }

   /*

   When buyButtonState.missingSelections changes ...

   */
   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (!buyButtonState.missingSelections) {
         return
      }

      if (!isOptionSelected()) {
         buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })
         animePulse(dropdownTrigger.current)
      }
   }, [buyButtonState.missingSelections])

   function isOptionSelected() {
      return productOptionState.isOptionSelected
   }

   function optionName() {
      return productOptionState.option.name
   }

   function getOptionName(selectedOption, option) {
      return selectedOption[option.name]
   }

   function getSelectedOption() {
      return productOptionState.selectedOption
   }

   function optionNameWithSelect() {
      return optionName() + ': ' + getOptionName(getSelectedOption(), productOptionState.option)
   }

   function displayOptionName() {
      return isOptionSelected() ? optionNameWithSelect() : optionName()
   }

   return (
      <button
         className='wps-btn wps-icon wps-icon-dropdown wps-modal-trigger'
         data-option=''
         data-option-id=''
         data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         onClick={onClick}
         ref={dropdownTrigger}
         style={{ backgroundColor: itemsState.componentOptions.variantButtonColor }}>
         {displayOptionName()}
      </button>
   )
}

export default ProductOptionTrigger

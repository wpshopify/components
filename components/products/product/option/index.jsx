import React, { useState, useEffect, useContext, useRef } from 'react'
import { ProductVariants } from '../variants'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { ProductBuyButtonContext } from '../buy-button/context'
import { useAnime, pulse } from '../../../../common/animations'
import { useOnClickOutside } from '../../../../common/hooks'
import { ShopContext } from '../../../shop/context'

const ProductOptionContext = React.createContext()

function ProductOption({ option }) {
   const [isOpen, setIsOpen] = useState(false)
   const [isOptionSelected, setIsOptionSelected] = useState(false)
   const [selectedOption, setSelectedOption] = useState({})
   const dropdown = useRef()
   const dropdownTrigger = useRef()
   const isFirstRender = useRef(true)
   const animePulse = useAnime(pulse)

   const { shopState } = useContext(ShopContext)
   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext)

   const buttonStyle = {
      backgroundColor: buyButtonState.componentOptions.variantColor
   }

   function getOptionName(selectedOption, option) {
      return selectedOption[option.name]
   }

   function toggleDropdown(e) {
      setIsOpen(!isOpen)
   }

   /*
   
   When buyButtonState.availableVariants changes ...
   
   */
   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      var optionIsAvailable = find(buyButtonState.availableVariants, selectedOption)

      if (optionIsAvailable === undefined) {
         setIsOptionSelected(false)

         buyButtonDispatch({ type: 'UNSET_SELECTED_OPTIONS', payload: option.name })
      }
   }, [buyButtonState.availableVariants])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (isEmpty(buyButtonState.selectedOptions)) {
         setIsOptionSelected(false)
      }
   }, [buyButtonState.selectedOptions])

   useOnClickOutside(dropdown, e => setIsOpen(false), isOpen)

   /*

   When buyButtonState.missingSelections changes ...

   */
   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (!buyButtonState.missingSelections) {
         return
      }

      if (!isOptionSelected) {
         buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })
         animePulse(dropdownTrigger.current)
      }
   }, [buyButtonState.missingSelections])

   return (
      <ProductOptionContext.Provider
         value={{
            isOptionSelected: isOptionSelected,
            setIsOptionSelected: setIsOptionSelected,
            option: option,
            selectedOption: selectedOption,
            setSelectedOption: setSelectedOption,
            toggleDropdown: toggleDropdown
         }}>
         <div className='wps-btn-dropdown wps-col wps-col-1' data-wps-is-selected={isOptionSelected} ref={dropdown}>
            <a
               href='#!'
               className='wps-btn wps-icon wps-icon-dropdown wps-modal-trigger'
               data-option=''
               data-option-id=''
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
               onClick={toggleDropdown}
               ref={dropdownTrigger}
               style={buttonStyle}>
               {!isOptionSelected ? option.name : option.name + ': ' + getOptionName(selectedOption, option)}
            </a>

            <ProductVariants dropdown={dropdown} setIsOpen={setIsOpen} isOpen={isOpen} option={option} />
         </div>
      </ProductOptionContext.Provider>
   )
}

export { ProductOption, ProductOptionContext }

import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductOptionContext } from '../option';
import { ProductBuyButtonContext } from '../buy-button/context';
import update from 'immutability-helper';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { createObj } from '../../../../common/utils';



function updateExistingSelections(selectedOptions, newSelectionObj) {
   return update(selectedOptions, { $merge: newSelectionObj });
}



function ProductVariant({ variant }) {

   const [isSelectable, setIsSelectable] = useState(true);
   const isFirstRender = useRef(true);

   const {
      option,
      isOptionSelected,
      setIsOptionSelected,
      setSelectedOption,
      toggleDropdown
   } = useContext(ProductOptionContext);

   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext);


   function onVariantSelection() {

      const newlySelected = createObj(option.name, variant.value);

      // console.log('newlySelected ', newlySelected);
      // console.log('selectedOptions ', selectedOptions);

      // const optionsUpdated = updateExistingSelections(buyButtonState.selectedOptions, newlySelected);

      // Opens or closes the dropdown
      toggleDropdown();

      // console.log('optionsUpdated ', optionsUpdated);

      // setSelectedOptions(optionsUpdated);
      buyButtonDispatch({ type: "UPDATE_SELECTED_OPTIONS", payload: newlySelected });

      setSelectedOption(newlySelected);
      setIsOptionSelected(true);

   }


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      var thingtocheck = createObj(option.name, variant.value);
      var found = find(buyButtonState.availableVariants, thingtocheck);

      if (found === undefined) {
         setIsSelectable(false);

      } else {
         setIsSelectable(true);
      }

   }, [buyButtonState.availableVariants]);



   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // console.log('buyButtonState.allOptionsSelected', buyButtonState.allOptionsSelected);
      // console.log('buyButtonState.selectedOptions ', buyButtonState.selectedOptions);

      if (isEmpty(buyButtonState.selectedOptions)) {
         setIsSelectable(true);
      }

   }, [buyButtonState.selectedOptions]);


   return (

      <li
         itemProp="category"
         className="wps-product-variant wps-product-style wps-modal-close-trigger"
         onClick={onVariantSelection}
         data-wps-is-selectable={isSelectable}>

         {variant.value}

      </li>

   )

}

export {
   ProductVariant
}

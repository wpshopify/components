import React, { useContext } from 'react';
import { ProductOptionContext } from '../option';

function ProductVariant({ option, toggleVariantsModal }) {

   const { isOptionSelected, setIsOptionSelected } = useContext(ProductOptionContext);

   function onVariantSelection() {
      toggleVariantsModal();
      setIsOptionSelected(!isOptionSelected);
   }

   return (

      <li
         itemProp="category"
         className="wps-product-style wps-modal-close-trigger"
         onClick={onVariantSelection}>

         {option.value}

      </li>

   )

}

export {
   ProductVariant
}

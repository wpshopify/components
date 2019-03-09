import React, { useRef, useEffect, useState } from "react";
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import { ProductVariant } from '../variant';


function buildSelectedOptionsData(selectedOptions) {

   // Reduce to a single object
   return reduce(JSON.parse(selectedOptions), merge);

}


function findVariantFromSelectedOptions(product, selectedOptions) {
   return client.product.variantForOptions(product, buildSelectedOptionsData(selectedOptions));
}



function ProductVariants({ option, isOpen, setIsOpen, toggleVariantsModal }) {

   const element = useRef();

   const [selectedOptions, setSelectedOptions] = useState([]);


   function handleClick(e) {

      if (!element.current.contains(e.target)) {

         // outside click
         setIsOpen(false);
         setSelectedOptions([]);
      }

   }


   function handleEsc(event) {

      if (event.keyCode === 27) {
         setSelectedOptions([]);
         setIsOpen(false);
      }

   }

   useEffect(() => {
      console.log('useEffect');
      // add when mounted
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc, false);

      // return function to be called when unmounted
      return () => {
         document.removeEventListener("mousedown", handleClick);
         document.removeEventListener("keydown", handleEsc, false);

      }

   }, []);


   return (
      <ul ref={element} className="wps-modal wps-variants" data-wps-modal-is-open={isOpen}>
         {option.values.map(optionValue => <ProductVariant key={optionValue.value} option={optionValue} toggleVariantsModal={toggleVariantsModal} />)}
      </ul>
   );

}

export {
   ProductVariants
}

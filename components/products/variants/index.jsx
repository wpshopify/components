import React, { useRef, useEffect, useState, useContext } from "react";
import { ProductVariant } from '../variant';

import filter from 'lodash/filter';
import merge from 'lodash/merge';
import { createObj } from '../../../common/utils';

import { ProductBuyButtonContext } from '../buy-button';
import { ProductOptionContext } from '../option';




function getAvailableVariants(product) {

   var combinations = product.variants.map(variant => {
      return variant.selectedOptions.map(selectableOption => createObj(selectableOption.name, selectableOption.value));
   });

   return combinations.map(combination => {
      return merge(...combination);
   });

}








function ProductVariants({ option, isOpen }) {

   const isFirstRender = useRef(true);

   const { product, setAvailableVariants } = useContext(ProductBuyButtonContext);
   const { selectedOption } = useContext(ProductOptionContext);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      var filteredavialablevariants = filter(getAvailableVariants(product), selectedOption);

      setAvailableVariants(filteredavialablevariants);


   }, [selectedOption]);



   return (
      <ul className="wps-modal wps-variants" data-wps-modal-is-open={isOpen}>
         {option.values.map(optionValue => <ProductVariant key={optionValue.value} variant={optionValue} />)}
      </ul>
   );

}

export {
   ProductVariants
}

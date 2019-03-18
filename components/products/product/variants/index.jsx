import React, { useRef, useEffect, useState, useContext } from "react";
import { ProductVariant } from '../variant';
import { ProductBuyButtonContext } from '../buy-button/context';
import { ProductOptionContext } from '../option';



function ProductVariants({ option, isOpen }) {

   const isFirstRender = useRef(true);
   const { buyButtonDispatch } = useContext(ProductBuyButtonContext);
   const { selectedOption } = useContext(ProductOptionContext);

   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      buyButtonDispatch({ type: "SET_AVAILABLE_VARIANTS", payload: selectedOption });

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

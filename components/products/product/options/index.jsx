import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductOption } from '../option';
import { ProductBuyButtonContext } from '../buy-button/context';
import size from 'lodash/size';


function allOptionsSelectedMatch(onlySelectedOptions, product) {
   return size(onlySelectedOptions) === product.options.length;
}


function ProductOptions() {

   const isFirstRender = useRef(true);
   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext);


   useEffect(() => {

      console.log('<ProductOptions /> - state.selectedOptions ', buyButtonState.selectedOptions);

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (allOptionsSelectedMatch(buyButtonState.selectedOptions, buyButtonState.product)) {

         console.log('setAllOptionsSelected to TRUE');
         // buyButtonState.setAllOptionsSelected(true);
         buyButtonDispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: true });

      } else {
         buyButtonDispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false });

      }



   }, [buyButtonState.selectedOptions]);



   return (

      <div
         className="wps-component wps-component-products-options"
         data-wps-is-component-wrapper
         data-wps-product-id={buyButtonState.product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         {buyButtonState.product.options.map(option => <ProductOption key={option.id} option={option}></ProductOption>)}

      </div>

   )

}

export {
   ProductOptions
}
import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductOption } from '../option';
import { ProductBuyButtonContext } from '../buy-button/context';
import size from 'lodash/size';


function allOptionsSelectedMatch(onlySelectedOptions, product) {
   return size(onlySelectedOptions) === product.options.length;
}


function ProductOptions() {

   const isFirstRender = useRef(true);
   const { state, dispatch } = useContext(ProductBuyButtonContext);


   useEffect(() => {

      console.log('<ProductOptions /> - state.selectedOptions ', state.selectedOptions);

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (allOptionsSelectedMatch(state.selectedOptions, state.product)) {

         console.log('setAllOptionsSelected to TRUE');
         // state.setAllOptionsSelected(true);
         dispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: true });

      } else {
         dispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false });

      }



   }, [state.selectedOptions]);



   return (

      <div
         className="wps-component wps-component-products-options"
         data-wps-is-component-wrapper
         data-wps-product-id={state.product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         {state.product.options.map(option => <ProductOption key={option.id} option={option}></ProductOption>)}

      </div>

   )

}

export {
   ProductOptions
}
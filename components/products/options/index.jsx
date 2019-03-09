import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductOption } from '../option';
import { ProductBuyButtonContext } from '../buy-button';
import has from 'lodash/has';
import filter from 'lodash/filter';
import head from 'lodash/head';
import size from 'lodash/size';



function allOptionsSelectedMatch(onlySelectedOptions, product) {
   return size(onlySelectedOptions) === product.options.length;
}


function ProductOptions() {

   const isFirstRender = useRef(true);
   const { product, selectedOptions, setAllOptionsSelected } = useContext(ProductBuyButtonContext);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (allOptionsSelectedMatch(selectedOptions, product)) {
         console.log('setAllOptionsSelected to TRUE');
         setAllOptionsSelected(true);
      }

   }, [selectedOptions]);



   // useEffect(() => {

   //    if (isFirstRender.current) {
   //       isFirstRender.current = false;
   //       return;
   //    }

   //    console.log('_____________ allOptionsSelected ', allOptionsSelected);

   //    if (allOptionsSelected) {
   //       // console.log('_____________ allOptionsSelected ', allOptionsSelected);
   //    }

   // }, [allOptionsSelected]);


   return (

      <div
         className="wps-component wps-component-products-options"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         {product.options.map(option => <ProductOption key={option.id} option={option}></ProductOption>)}

      </div>

   )

}

export {
   ProductOptions
}
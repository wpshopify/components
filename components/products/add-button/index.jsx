import React, { useContext } from 'react';
import { ProductBuyButtonContext } from '../buy-button';

function ProductAddButton() {

   const { product, isLoading, selectedOptions, allOptionsSelected, setMissingSelections } = useContext(ProductBuyButtonContext);


   function handleClick() {
      console.log('<ProductAddButton /> -- selectedOptions', selectedOptions);
      console.log('<ProductAddButton /> -- allOptionsSelected', allOptionsSelected);

      if (!allOptionsSelected) {
         console.log('Not all dropdowns are selected');
         setMissingSelections(true);
      }
      // check if all options are selected 
      // if some are not selected, highlight them / shake them 
      // if all options are selected, output the selected options 
   }

   return (

      <div
         className="wps-component wps-component-products-add-button wps-btn-wrapper"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <button
            type="button"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/BuyAction"
            href="#!"
            className="wps-btn wps-add-to-cart"
            title={product.title}
            data-wps-is-ready={isLoading ? '0' : '1'}
            onClick={handleClick}>

            Add to cart

         </button>

      </div>

   )

}


export {
   ProductAddButton
}
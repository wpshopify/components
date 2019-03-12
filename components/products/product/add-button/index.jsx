import React, { useContext, useRef, useEffect, useState } from 'react';
import { ProductBuyButtonContext } from '../buy-button/context';
import { pulse } from '../../../common/animations';
import { addLineItems, findVariantFromSelectedOptions } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { lowercaseObjKeys } from '../../../common/utils';


function ProductAddButton() {

   const button = useRef();
   const isFirstRender = useRef(false);
   const { state, dispatch } = useContext(ProductBuyButtonContext);

   async function handleClick() {
      console.log('<ProductAddButton /> -- selectedOptions', state.selectedOptions);
      console.log('<ProductAddButton /> -- allOptionsSelected', state.allOptionsSelected);

      // check if all options are selected 
      // if some are not selected, highlight them / shake them 
      if (!state.allOptionsSelected) {
         console.log('Not all dropdowns are selected');
         // setMissingSelections(true);
         dispatch({ type: "SET_MISSING_SELECTIONS", payload: true });

      } else {

         dispatch({ type: "SET_IS_ADDING_TO_CART", payload: true });

         // if all options are selected, output the selected options
         // var lowercased = lowercaseObjKeys(state.selectedOptions);
         console.log('state.selectedOptions', state.selectedOptions);
         console.log('state.product', state.product);
         // console.log('lowercased ', lowercased);

         const variant = findVariantFromSelectedOptions(state.product, state.selectedOptions);

         console.log('variant found? ', variant.id);

         const lineItems = [
            { variantId: variant.id, quantity: 1 }
         ];

         try {

            var added = await addLineItems(lineItems);
            console.log('added ', added);

            // Need to check for any errors here
            if (added) {
               dispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false });
               dispatch({ type: "SET_IS_ADDING_TO_CART", payload: false });
               dispatch({ type: "REMOVE_SELECTED_OPTIONS" });
            }

         } catch (erro) {
            console.log('added erro', erro);

         }


      }


   }

   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (state.allOptionsSelected) {
         pulse(button.current);
      }

   }, [state.allOptionsSelected]);

   return (

      <div
         className="wps-component wps-component-products-add-button wps-btn-wrapper"
         data-wps-is-component-wrapper
         data-wps-product-id={state.product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <button
            ref={button}
            type="button"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/BuyAction"
            href="#!"
            className="wps-btn wps-add-to-cart"
            title={state.product.title}
            data-wps-is-ready={state.isLoading ? '0' : '1'}
            data-wps-is-adding={state.isAdding ? '1' : '0'}
            disabled={state.isAdding ? true : false}
            onClick={handleClick}>

            {state.isAdding ? 'Adding ...' : 'Add to cart'}

         </button>

      </div>

   )

}


export {
   ProductAddButton
}
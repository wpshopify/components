import React, { useContext, useRef, useEffect, useState } from 'react';
import { ProductBuyButtonContext } from '../buy-button/context';
import { ShopContext } from '../../../shop/context';

import { getCache, setCache } from '../../../../common/cache';
import { pulse } from '../../../../common/animations';
import { addProductDetailsToVariant } from '../../../../common/products';

import {
   addLineItems,
   findVariantFromSelectedOptions,
   getCheckoutCache,
   setCheckoutCache,
   mergeCheckoutCacheVariants
} from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { lowercaseObjKeys } from '../../../../common/utils';





function ProductAddButton() {

   const button = useRef();
   const isFirstRender = useRef(false);
   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext);
   const { shopState, shopDispatch } = useContext(ShopContext);


   async function handleClick() {

      console.log('<ProductAddButton /> -- selectedOptions', buyButtonState.selectedOptions);
      console.log('<ProductAddButton /> -- allOptionsSelected', buyButtonState.allOptionsSelected);

      // check if all options are selected 
      // if some are not selected, highlight them / shake them 
      if (!buyButtonState.allOptionsSelected) {
         console.log('Not all dropdowns are selected');
         // setMissingSelections(true);
         buyButtonDispatch({ type: "SET_MISSING_SELECTIONS", payload: true });

      } else {

         buyButtonDispatch({ type: "SET_IS_ADDING_TO_CART", payload: true });

         // if all options are selected, output the selected options
         // var lowercased = lowercaseObjKeys(buyButtonState.selectedOptions);
         console.log('buyButtonState.selectedOptions', buyButtonState.selectedOptions);
         console.log('buyButtonState.product', buyButtonState.product);
         // console.log('lowercased ', lowercased);



         const variant = findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions);
         console.log('buyButtonState.quantity', buyButtonState.quantity);

         const lineItem = { variantId: variant.id, quantity: buyButtonState.quantity };
         const variantCopy = variant;
         console.log('buyButtonState.product.id', buyButtonState.product.id);


         var modVariant = addProductDetailsToVariant(variant, buyButtonState.product);

         console.log('variant found :: ', modVariant);

         shopDispatch({
            type: "UPDATE_CHECKOUT_CACHE",
            payload: {
               checkoutID: shopState.checkout.id,
               lineItems: [lineItem],
               variants: [modVariant]
            }
         });

         shopDispatch({ type: "SET_CHECKOUT_TOTAL" });

         buyButtonDispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false });
         buyButtonDispatch({ type: "SET_IS_ADDING_TO_CART", payload: false });
         buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" });

         shopDispatch({ type: "NOTIFY_CART", payload: true });




         // try {

         //    var updatedCheckout = await addLineItems(lineItems);

         //    // Need to check for any errors here
         //    if (updatedCheckout) {

         //       buyButtonDispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false });
         //       buyButtonDispatch({ type: "SET_IS_ADDING_TO_CART", payload: false });
         //       buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" });

         //       shopDispatch({ type: "UPDATE_CHECKOUT", payload: updatedCheckout });
         //       shopDispatch({ type: "NOTIFY_CART", payload: true });

         //    }

         // } catch (erro) {
         //    console.log('added erro', erro);

         // }


      }


   }


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (buyButtonState.allOptionsSelected) {
         pulse(button.current);
      }

   }, [buyButtonState.allOptionsSelected]);



   return (

      <div
         className="wps-component wps-component-products-add-button wps-btn-wrapper"
         data-wps-is-component-wrapper
         data-wps-product-id={buyButtonState.product.id}
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
            title={buyButtonState.product.title}
            data-wps-is-ready={buyButtonState.isLoading ? '0' : '1'}
            data-wps-is-adding={buyButtonState.isAdding ? '1' : '0'}
            disabled={buyButtonState.isAdding ? true : false}
            onClick={handleClick}>

            {buyButtonState.isAdding ? 'Adding ...' : 'Add to cart'}

         </button>

      </div>

   )

}


export {
   ProductAddButton
}
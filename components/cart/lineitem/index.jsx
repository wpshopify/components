import React, { useContext, useRef, useEffect, useState } from 'react';
import { CartContext } from '../../cart/context';
import { ShopContext } from '../../shop/context';

import { CartLineItemQuantity } from './quantity';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';
import { stagger } from '../../../common/animations';
import { calcLineItemTotal } from '../../../common/products';
import find from 'lodash/find';

function getLineItemFromState(lineItem, lineItemsFromState) {
   return find(lineItemsFromState, { 'variantId': lineItem.id });
}

function CartLineItem({ lineItem, index }) {

   console.log('lineItem ...', lineItem);

   const { cartState, cartDispatch } = useContext(CartContext);
   const { shopState, shopDispatch } = useContext(ShopContext);

   const [isUpdating, setIsUpdaing] = useState(false);

   // const cachedLineItemData = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems);

   const [lineItemQuantity, setLineItemQuantity] = useState(0);
   const [lineItemTotal, setLineItemTotal] = useState(0);

   // const [lineItemPrice, setLineItemPrice] = useState(lineItem.price);
   // const oldLineItemPrice = lineItem.price;
   // const oldLineItemQuantity = 1;

   const variantId = useRef(false);
   const lineItemElement = useRef();
   const isFirstRender = useRef(true);
   const lineItemTotalElement = useRef();




   useEffect(() => {

      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems);

      variantId.current = lineItemFoumd.variantId;

      setLineItemQuantity(lineItemFoumd.quantity);
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFoumd.quantity));

   }, [shopState.checkoutCache.lineItems]);


   useEffect(() => {

      if (cartState.cartOpen) {
         stagger(lineItemElement.current, index);
      }

   }, [cartState.cartOpen]);


   return (
      <div
         className="wps-cart-lineitem row"
         data-wps-is-updating={isUpdating}
         ref={lineItemElement}>


         <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-img-link" target="_blank">
            <div
               className="wps-cart-lineitem-img"
               style={{ backgroundImage: `url(${lineItem.image.src})` }}
               data-wps-is-ready={shopState.isReady}>
            </div>
         </a>


         <div className="wps-cart-lineitem-content">

            <div className="wps-cart-lineitem-content-row">

               <span className="wps-cart-lineitem-title" data-wps-is-ready={shopState.isReady}>
                  {lineItem.productTitle}
               </span>

               <div className="wps-cart-lineitem-variant-title" data-wps-is-ready={shopState.isReady}>{lineItem.title}</div>

            </div>

            <div className="wps-cart-lineitem-content-row wps-row">

               <CartLineItemQuantity
                  lineItem={lineItem}
                  variantId={variantId}
                  lineItemQuantity={lineItemQuantity}
                  setLineItemQuantity={setLineItemQuantity}
                  isReady={shopState.isReady}
                  isFirstRender={isFirstRender}
                  setLineItemTotal={setLineItemTotal}
                  lineItemTotalElement={lineItemTotalElement} />

               <div
                  className="wps-cart-lineitem-price wps-cart-lineitem-price-total"
                  data-wps-is-ready={shopState.isReady}
                  ref={lineItemTotalElement}>

                  {maybeformatPriceToCurrency(lineItemTotal)}

               </div>

            </div>

         </div>
      </div>

   )

}

export {
   CartLineItem
}
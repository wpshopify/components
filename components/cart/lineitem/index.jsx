import React, { useContext, useRef, useEffect, useState } from 'react';
import { CartContext } from '../../cart/context';
import { ShopContext } from '../../shop/context';

import { CartLineItemQuantity } from './quantity';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';




function CartLineItem({ lineItem }) {


   const { cartState, cartDispatch } = useContext(CartContext);
   const { shopState } = useContext(ShopContext);

   const [isUpdating, setIsUpdaing] = useState(false);

   const [lineItemQuantity, setLineItemQuantity] = useState(1);
   const [lineItemPrice, setLineItemPrice] = useState(lineItem.price);
   const oldLineItemPrice = lineItem.price;
   const oldLineItemQuantity = 1;

   const isFirstRender = useRef(true);

   // const [localTotalPrice, setLocalTotalPrice] = useState(cartState.totalPrice);


   function handleQuantityChange() {
      console.log('handleQuantityChange');
   }


   // useEffect(() => {

   //    setLocalTotalPrice(localTotalPrice);

   // }, [cartState.totalPrice]);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // console.log('......... cartState.totalPrice ', cartState.totalPrice);
      console.log('<CartLineItem /> useEffect lineItemQuantity');
      // console.log('shopState.totalPrice ', shopState.totalPrice);

      cartDispatch({ type: 'SET_IS_UPDATING' });


      // cartDispatch({
      //    type: "UPDATE_TOTAL_PRICE",
      //    payload: {
      //       currentTotalPrice: cartState.totalPrice,
      //       lineItemPrice: lineItemPrice,
      //       lineItemQuantity: lineItemQuantity,
      //       oldLineItemPrice: oldLineItemPrice,
      //       oldLineItemQuantity: oldLineItemQuantity
      //    }
      // });


   }, [lineItemQuantity]);




   return (
      <div
         className="wps-cart-lineitem row"
         data-wps-is-updating={isUpdating}>


         <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-img-link" target="_blank">
            <div
               className="wps-cart-lineitem-img"
               style={{ backgroundImage: `url(${lineItem.image.src})` }}
               data-wps-is-ready={shopState.isReady}>
            </div>
         </a>


         <div className="wps-cart-lineitem-content">

            <div className="wps-cart-lineitem-content-row">
               <div className="wps-cart-lineitem-variant-title" data-wps-is-ready={shopState.isReady}>{lineItem.title}</div>

               <a
                  href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-title" data-wps-is-ready={shopState.isReady}>
                  {lineItem.productTitle}
               </a>

            </div>

            <div className="wps-cart-lineitem-content-row wps-row">

               <CartLineItemQuantity
                  lineitem={lineItem}
                  lineItemQuantity={lineItemQuantity}
                  setLineItemQuantity={setLineItemQuantity}
                  isReady={shopState.isReady} />

               <div className="wps-cart-lineitem-price" data-wps-is-ready={shopState.isReady}>
                  <span className="wps-cart-lineitem-num-of">x{lineItemQuantity}</span> {maybeformatPriceToCurrency(lineItem.price)}
               </div>

            </div>

         </div>
      </div>

   )

}

export {
   CartLineItem
}
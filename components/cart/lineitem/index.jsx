import React, { useContext, useRef, useEffect, useState } from 'react';
import { ShopContext } from '../../shop/context';
import { CartContext } from '../../cart/context';
import { CartLineItemQuantity } from './quantity';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';






function CartLineItem({ lineItem }) {

   console.log('lineItem ', lineItem);

   const { shopState } = useContext(ShopContext);
   const { cartState, cartDispatch } = useContext(CartContext);

   const isFirstRender = useRef(true);
   const [lineItemQuantity, setLineItemQuantity] = useState(lineItem.quantity);
   const [lineItemPrice, setLineItemPrice] = useState(lineItem.variant.price);
   const oldLineItemPrice = lineItem.variant.price;
   const oldLineItemQuantity = lineItem.quantity;

   const [localTotalPrice, setLocalTotalPrice] = useState(shopState.totalPrice);


   function handleQuantityChange() {
      console.log('handleQuantityChange');
   }


   useEffect(() => {

      setLocalTotalPrice(localTotalPrice);

   }, [cartState.totalPrice]);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      console.log('cartState.totalPrice ', localTotalPrice);
      // console.log('shopState.totalPrice ', shopState.totalPrice);


      cartDispatch({
         type: "UPDATE_TOTAL_PRICE",
         payload: {
            currentTotalPrice: localTotalPrice,
            lineItemPrice: lineItemPrice,
            lineItemQuantity: lineItemQuantity,
            oldLineItemPrice: oldLineItemPrice,
            oldLineItemQuantity: oldLineItemQuantity
         }
      });

   }, [lineItemQuantity]);


   return (
      <div className="wps-cart-lineitem row">


         <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-img-link" target="_blank">
            <div className="wps-cart-lineitem-img" style={{ backgroundImage: `url(${lineItem.variant.image.src})` }}></div>
         </a>


         <div className="wps-cart-lineitem-content">

            <div className="wps-cart-lineitem-content-row">
               <div className="wps-cart-lineitem-variant-title">{lineItem.variant.title}</div>
               <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-title">{lineItem.title}</a>
            </div>

            <div className="wps-cart-lineitem-content-row wps-row">

               <CartLineItemQuantity
                  lineitem={lineItem}
                  lineItemQuantity={lineItemQuantity}
                  setLineItemQuantity={setLineItemQuantity} />

               <div className="wps-cart-lineitem-price">
                  <span className="wps-cart-lineitem-num-of">x{lineItemQuantity}</span> {maybeformatPriceToCurrency(lineItemPrice)}
               </div>

            </div>

         </div>
      </div>

   )

}

export {
   CartLineItem
}
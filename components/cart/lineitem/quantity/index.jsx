import React, { useContext } from 'react';
import { ShopContext } from '../../../shop/context';
import find from 'lodash/find';
import { calcLineItemTotal } from '../../../../common/products';
import { useAnime, pulse } from '../../../../common/animations';

function CartLineItemQuantity({ lineItem, variantId, lineItemQuantity, setLineItemQuantity, isReady, isFirstRender, setLineItemTotal, lineItemTotalElement, elementExists }) {

   const { shopState, shopDispatch } = useContext(ShopContext);
   const animePulse = useAnime(pulse);

   function changeQuantity(newQuantity) {

      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems);

      if (lineItemFoumd && isFirstRender.current) {
         variantId.current = lineItemFoumd.variantId;
      }

      animePulse(lineItemTotalElement.current, elementExists);

      setLineItemQuantity(newQuantity);
      setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price));

      if (isRemovingLineItem(newQuantity)) {
         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current });
      }

      shopDispatch({
         type: 'UPDATE_LINE_ITEM_QUANTITY',
         payload: {
            variantId: variantId.current,
            lineItemNewQuantity: newQuantity
         }
      });


      shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' });


   }


   function handleQuantityChange(e) {
      setLineItemQuantity(e.target.value);
   }

   function handleQuantityBlur(e) {

      if (isRemovingLineItem(e.target.value)) {

         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current });
         shopDispatch({
            type: 'UPDATE_LINE_ITEM_QUANTITY',
            payload: {
               variantId: variantId.current,
               lineItemNewQuantity: 0
            }
         });

         shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' });

      }

   }

   // 1 is the previous value before decrementing _again_
   function isRemovingLineItem(quantity) {
      return Number(quantity) === 0;
   }

   function getLineItemFromState(lineItem, lineItemsFromState) {
      return find(lineItemsFromState, { 'variantId': lineItem.id });
   }


   /*

   Responsible for: decrementing line item quantity

   */
   function handleDecrement() {
      console.log('elementExists handleDecrement', elementExists);

      changeQuantity(lineItemQuantity - 1);
   }


   /*

   Responsible for: incrementing line item quantity

   */
   function handleIncrement() {
      changeQuantity(lineItemQuantity + 1);
   }

   return (

      <div className="wps-cart-lineitem-quantity-container" data-wps-is-ready={isReady}>

         <button className="wps-quantity-decrement" type="button" onClick={handleDecrement}>
            <span className="wps-quantity-icon wps-quantity-decrement-icon"></span>
         </button>

         <input className="wps-cart-lineitem-quantity" type="number" min="0" aria-label="Quantity" value={lineItemQuantity} onChange={handleQuantityChange} onBlur={handleQuantityBlur} />

         <button className="wps-quantity-increment" type="button" onClick={handleIncrement}>
            <span className="wps-quantity-icon wps-quantity-increment-icon"></span>
         </button>

      </div>

   )

}

export {
   CartLineItemQuantity
}
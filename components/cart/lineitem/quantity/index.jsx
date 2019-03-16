import React, { useContext } from 'react';
import { ShopContext } from '../../../shop/context';
import find from 'lodash/find';
import { calcLineItemTotal } from '../../../../common/products';
import { pulse } from '../../../../common/animations';

function CartLineItemQuantity({ lineItem, variantId, lineItemQuantity, setLineItemQuantity, isReady, isFirstRender, setLineItemTotal, lineItemTotalElement }) {

   const { shopState, shopDispatch } = useContext(ShopContext);


   function changeQuantity(newQuantity, oldQuantity) {

      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems);

      if (lineItemFoumd && isFirstRender.current) {
         variantId.current = lineItemFoumd.variantId;
      }

      pulse(lineItemTotalElement.current);

      setLineItemQuantity(newQuantity);
      setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price));

      shopDispatch({
         type: 'UPDATE_LINE_ITEM_QUANTITY',
         payload: {
            variantId: variantId.current,
            lineItemNewQuantity: newQuantity
         }
      });

      shopDispatch({
         type: 'UPDATE_CHECKOUT_TOTAL',
         payload: {
            lineItemPrice: lineItem.price,
            lineItemOldQuantity: oldQuantity,
            lineItemNewQuantity: newQuantity
         }
      });

   }


   function handleQuantityChange(e) {
      console.log('handleQuantityChange', e.target.value);

      setLineItemQuantity(e.target.value);
   }

   function handleQuantityBlur(e) {
      console.log('handleQuantityBlur', e.target.value);
      console.log('lineItemQuantity', lineItemQuantity);

      if (isRemovingLineItem(e.target.value)) {
         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current });
         shopDispatch({ type: 'SET_CHECKOUT_TOTAL' });
      }
      // setLineItemQuantity(e.target.value);
   }

   // 1 is the previous value before decrementing _again_
   function isRemovingLineItem(quantity) {
      return Number(quantity) === 0;
   }

   function getLineItemFromState(lineItem, lineItemsFromState) {
      return find(lineItemsFromState, { 'variantId': lineItem.id });
   }

   function handleDecrement() {

      console.log('handleDecrement');

      var oldQuantity = lineItemQuantity;
      var newQuantity = lineItemQuantity - 1;

      if (isRemovingLineItem(newQuantity)) {
         console.log('variantId', variantId);

         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current });
         shopDispatch({ type: 'SET_CHECKOUT_TOTAL' });
      }

      changeQuantity(newQuantity, oldQuantity);

   }

   function handleIncrement() {

      console.log('handleIncrement');

      var oldQuantity = lineItemQuantity;
      var newQuantity = lineItemQuantity + 1;

      changeQuantity(newQuantity, oldQuantity);

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
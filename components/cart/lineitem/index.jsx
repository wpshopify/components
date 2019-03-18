import React, { useContext, useRef, useEffect, useState } from 'react';
import { CartContext } from '../../cart/context';
import { ShopContext } from '../../shop/context';

import { CartLineItemQuantity } from './quantity';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';
import { useAnime, stagger } from '../../../common/animations';
import { calcLineItemTotal } from '../../../common/products';

import { ProductNotice } from '../../products/product/notice';
import { ProductNoticeOutOfStock } from '../../products/product/notice/out-of-stock';

import find from 'lodash/find';

function getLineItemFromState(lineItem, lineItemsFromState) {
   return find(lineItemsFromState, { 'variantId': lineItem.id });
}

function CartLineItem({ lineItem, index }) {

   console.log('lineItem', lineItem);


   const { cartState } = useContext(CartContext);
   const { shopState, shopDispatch } = useContext(ShopContext);

   const [isUpdating] = useState(false);
   const animeStagger = useAnime(stagger);

   const [lineItemQuantity, setLineItemQuantity] = useState(0);
   const [lineItemTotal, setLineItemTotal] = useState(0);

   const variantId = useRef(false);
   const lineItemElement = useRef();
   const isFirstRender = useRef(true);
   const lineItemTotalElement = useRef();


   function removeLineItem(e) {

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

   useEffect(() => {

      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems);

      variantId.current = lineItemFoumd.variantId;

      setLineItemQuantity(lineItemFoumd.quantity);
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFoumd.quantity));

   }, [shopState.checkoutCache.lineItems]);


   useEffect(() => {

      if (cartState.cartOpen) {
         // stagger(lineItemElement.current, index);
         animeStagger(lineItemElement.current, index)
      }

   }, [cartState.cartOpen]);


   return (
      <div
         className="wps-cart-lineitem row"
         data-wps-is-updating={isUpdating}
         data-wps-is-available={lineItem.available}
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

               <p className="wps-cart-lineitem-title" data-wps-is-ready={shopState.isReady}>

                  <span className="wps-cart-lineitem-title-content">{lineItem.productTitle}</span>
                  <span className="wps-cart-lineitem-remove" onClick={removeLineItem}>Remove</span>

               </p>

               <div className="wps-cart-lineitem-variant-title" data-wps-is-ready={shopState.isReady}>{lineItem.title}</div>

            </div>

            {
               !lineItem.available
                  ? <ProductNotice type="warning"> <ProductNoticeOutOfStock /> </ProductNotice>
                  : <div className="wps-cart-lineitem-content-row wps-row">

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

            }

         </div>
      </div>

   )

}

export {
   CartLineItem
}
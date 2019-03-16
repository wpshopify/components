import React, { useContext } from 'react';
import { ProductBuyButtonContext } from '../buy-button/context';

function ProductQuantity() {

   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext);

   function handleQuantityChange(e) {
      console.log('e.target.value ', e.target.value);

      buyButtonDispatch({type: 'UPDATE_QUANTITY', payload: Number(e.target.value)});

   }

   return (
      <div
         className="wps-component wps-component-products-quantity"
         data-wps-is-component-wrapper
         data-wps-product-id={buyButtonState.product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <div className="wps-form-control wps-row wps-product-quantity-wrapper">

            <div className="wps-quantity-input wps-quantity-label-wrapper" data-wps-is-ready={buyButtonState.isLoading ? '0' : '1'}>
               <label htmlFor="wps-product-quantity">Quantity</label>
            </div>

            <div className="wps-quantity-input wps-quantity-input-wrapper" data-wps-is-ready={buyButtonState.isLoading ? '0' : '1'}>
               <input type="number" name="wps-product-quantity" className="wps-product-quantity wps-form-input" defaultValue={buyButtonState.quantity} onChange={handleQuantityChange} min="1" />
            </div>

         </div>

      </div>
   )

}

export {
   ProductQuantity
}
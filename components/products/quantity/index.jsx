import React, { useContext } from 'react';
import { LoadingContext } from '../../../common/context';

function ProductQuantity({ product }) {

   const isLoading = useContext(LoadingContext);

   return (
      <div
         className="wps-component wps-component-products-quantity"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <div className="wps-form-control wps-row wps-product-quantity-wrapper">

            <div className="wps-quantity-input wps-quantity-label-wrapper" data-wps-is-ready={isLoading ? '0' : '1'}>
               <label htmlFor="wps-product-quantity">Quantity</label>
            </div>

            <div className="wps-quantity-input wps-quantity-input-wrapper" data-wps-is-ready={isLoading ? '0' : '1'}>
               <input type="number" name="wps-product-quantity" className="wps-product-quantity wps-form-input" defaultValue="1" min="1" />
            </div>

         </div>

      </div>
   )

}

export default ProductQuantity;

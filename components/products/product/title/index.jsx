import React, { useContext } from 'react';
import { ShopContext } from '../../../shop/context';
import { ProductContext } from '../context';

function ProductTitle() {

   const { shopState } = useContext(ShopContext);
   const { productState } = useContext(ProductContext);

   return (
      <div
         className="wps-component wps-component-products-title"
         data-wps-is-component-wrapper
         data-wps-product-id={productState.product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <h2 itemProp="name" className="wps-products-title" data-wps-is-ready={shopState.isReady ? '1' : '0'}>
            {productState.product.title}
         </h2>

      </div>
   )

}

export {
   ProductTitle
}

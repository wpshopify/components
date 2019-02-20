import React, { useContext } from 'react';
import { ProductContext } from '../index';

function ProductTitle({ product }) {

   return (
      <div
         className="wps-component wps-component-products-title"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-is-lite-sync="1">

         <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="1">
            {product.title}
         </h2>

      </div>
   )

}

export default ProductTitle;

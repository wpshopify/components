import React, { useContext } from 'react';

function ProductDescription({ product }) {

   return (

      <div
         className="wps-component wps-component-products-description"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-is-lite-sync="1">

         <div itemProp="description" className="wps-products-description" data-wps-is-ready="1">
            {product.description}
         </div>

      </div>

   )

}

export default ProductDescription;

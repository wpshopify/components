import React, { useContext } from 'react';
import ProductOption from '../option';


function ProductOptions({ product }) {

   return (

      <div
         className="wps-component wps-component-products-options"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-is-lite-sync="1">

         {product.options.map(option => <ProductOption key={option.id} option={option}></ProductOption>)}

      </div>

   )

}

export default ProductOptions;

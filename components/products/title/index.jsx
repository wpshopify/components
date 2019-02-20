import React, { useContext } from 'react';
import { LoadingContext } from '../../../common/context';

function ProductTitle({ product }) {

   const isLoading = useContext(LoadingContext);

   return (
      <div
         className="wps-component wps-component-products-title"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <h2 itemProp="name" className="wps-products-title" data-wps-is-ready={isLoading ? '0' : '1'}>
            {product.title}
         </h2>

      </div>
   )

}

export default ProductTitle;

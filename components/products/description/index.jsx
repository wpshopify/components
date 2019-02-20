import React, { useContext } from 'react';
import { LoadingContext } from '../../../common/context';


function ProductDescription({ product }) {

   const isLoading = useContext(LoadingContext);

   return (

      <div
         className="wps-component wps-component-products-description"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-ignore-sync="1">

         <div itemProp="description" className="wps-products-description" data-wps-is-ready={isLoading ? '0' : '1'}>
            {product.description}
         </div>

      </div>

   )

}

export default ProductDescription;

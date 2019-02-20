import React, { useContext } from 'react';
import { LoadingContext } from '../../../common/context';

function ProductGallery({ product }) {

   const isLoading = useContext(LoadingContext);

   return (
      <h2
         itemProp="name"
         className="wps-products-title"
         data-wps-is-ready={isLoading ? '0' : '1'}>

         {product.title}

      </h2>
   )

}

export default ProductGallery;

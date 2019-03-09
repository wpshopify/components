import React from 'react';


function ProductGallery({ product, isLoading }) {

   return (
      <h2
         itemProp="name"
         className="wps-products-title"
         data-wps-is-ready={isLoading ? '0' : '1'}>

         {product.title}

      </h2>
   )

}

export {
   ProductGallery
}

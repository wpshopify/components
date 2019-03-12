import React from 'react';

function getFeaturedImageFromProduct(product) {
   return product.images[0];
}

function ProductFeaturedImage({ product, isLoading }) {

   const featImage = getFeaturedImageFromProduct(product);

   return (

      featImage ? (
         <div
            className="wps-component wps-component-products-images-featured"
            data-wps-is-component-wrapper
            data-wps-product-id={product.id}
            data-wps-post-id=""
            data-wps-ignore-sync="1">

            <div
               className="wps-product-image-wrapper"
               data-wps-is-ready={isLoading ? '0' : '1'}>
               <img
                  itemProp="image"
                  src={featImage.src}
                  className="wps-product-image"
                  alt={featImage.alt}
               />
            </div>

         </div>

      ) : (
            <><span>No image found</span></>
         )

   )

}

export {
   ProductFeaturedImage
}
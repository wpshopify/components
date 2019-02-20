import React, { useContext } from 'react';

function getFeaturedImageFromProduct(product) {
   return product.images[0];
}

function ProductFeaturedImage({ product }) {

   const featImage = getFeaturedImageFromProduct(product);

   return (

      featImage ? (
         <div
            className="wps-component wps-component-products-images-featured"
            data-wps-is-component-wrapper
            data-wps-product-id={product.id}
            data-wps-post-id=""
            data-wps-is-lite-sync="1">

            <img
               itemProp="image"
               src={featImage.src}
               className="wps-product-image"
               alt={featImage.alt} />

         </div>

      ) : (
            <><span>No image found</span></>
         )

   )

}

export default ProductFeaturedImage;
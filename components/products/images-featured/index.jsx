import React, { useContext } from 'react';
import { LoadingContext } from '../../../common/context';

function getFeaturedImageFromProduct(product) {
   return product.images[0];
}

function ProductFeaturedImage({ product }) {

   const featImage = getFeaturedImageFromProduct(product);
   const { isLoading } = useContext(LoadingContext);

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

export default ProductFeaturedImage;
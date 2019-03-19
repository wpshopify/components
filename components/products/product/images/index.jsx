import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductFeaturedImage } from "./featured";
import { ProductGallery } from "./gallery";
import { ProductContext } from "../context";

function ProductImages() {
   const { productState } = useContext(ProductContext);

   function hasManyImages(product) {
      return productState.product.images.length > 2;
   }

   return (
      <div className="wps-component wps-component-products-images">
         {hasManyImages(productState.product) ? (
            <ProductGallery />
         ) : (
            <ProductFeaturedImage />
         )}
      </div>
   );
}

export { ProductImages };

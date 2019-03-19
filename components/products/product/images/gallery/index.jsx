import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../../context";
import { ProductThumbnailImages } from "../thumbnails";
import { ProductFeaturedImage } from "../featured";

function ProductGallery() {
   const { productState } = useContext(ProductContext);

   function isFeatImage(index) {
      return index === 0 ? true : false;
   }

   return (
      <>
         <div className="wps-gallery-featured-wrapper">
            <ProductFeaturedImage />
         </div>
         <div className="wps-thumbnails-wrapper">
            <ProductThumbnailImages />
         </div>
      </>
   );
}

export { ProductGallery };

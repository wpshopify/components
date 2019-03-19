import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../../context";
import { ProductThumbnailImages } from "../thumbnails";
import { ProductFeaturedImage } from "../featured";
import { ProductGalleryContext } from "./context";
import { getProductGalleryInitialState } from "./initial-state";

function ProductGallery() {
   const [state, dispatch] = useReducer(getProductGalleryInitialState());

   return (
      <>
         <ProductGalleryContext.Provider
            value={{
               galleryState: state,
               galleryDispatch: dispatch
            }}>
            <div className="wps-gallery-featured-wrapper">
               <ProductFeaturedImage />
            </div>
            <div className="wps-thumbnails-wrapper">
               <ProductThumbnailImages />
            </div>
         </ProductGalleryContext.Provider>
      </>
   );
}

export { ProductGallery };

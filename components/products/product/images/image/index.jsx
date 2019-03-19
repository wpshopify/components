import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../../../../shop/context";
import Drift from "drift-zoom";
import { addCustomSizingToImageUrl } from "../../../../../common/images";

function ProductImage({ isFeatured, image, paneElement }) {
   const imageRef = useRef();
   const { shopState } = useContext(ShopContext);
   const [origFeatImage, setOrigFeatImage] = useState(image.src);
   const [optFeatImage, setoptFeatImage] = useState(
      addCustomSizingToImageUrl({
         src: origFeatImage,
         width: shopState.settings.productsImagesSizingWidth,
         height: shopState.settings.productsImagesSizingHeight,
         crop: shopState.settings.productsImagesSizingCrop,
         scale: shopState.settings.productsImagesSizingScale
      })
   );

   useEffect(() => {
      if (isFeatured) {
         if (paneElement) {
            console.log("imageRef.current", imageRef.current);
            console.log("paneElement", paneElement.current);

            new Drift(imageRef.current, {
               paneContainer: paneElement.current,
               inlinePane: false
            });
         }
      }
   }, []);

   return (
      <img
         ref={imageRef}
         itemProp="image"
         src={optFeatImage}
         className="wps-product-image"
         alt={image.altText}
         data-wps-is-ready={shopState.isReady ? "1" : "0"}
         data-zoom={origFeatImage}
      />
   );
}

export { ProductImage };

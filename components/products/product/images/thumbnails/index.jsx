import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductThumbnailImage } from "../thumbnail";
import { ProductContext } from "../../context";

function ProductThumbnailImages() {
   const { productState } = useContext(ProductContext);

   return productState.product.images.map(image => (
      <ProductThumbnailImage key={image.id} image={image} />
   ));
}

export { ProductThumbnailImages };

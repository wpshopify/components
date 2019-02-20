import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

function ProductGallery({ product }) {

   return (
      <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="1">
         {product.title}
      </h2>
   )

}

export default ProductGallery;

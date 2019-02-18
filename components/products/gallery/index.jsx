import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ProductContext } from '../index';


function ProductGallery() {

  const product = useContext(ProductContext);

  return (
    <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="1">
      { product.title }
    </h2>
  )

}

export default ProductGallery;

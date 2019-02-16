import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
// import ProductTitle from './title';
import { ProductContext } from '../index';


function ProductTitle() {

  const product = useContext(ProductContext);

  return (
    <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="1">
      { product.title }
    </h2>
  )

}

export default ProductTitle;

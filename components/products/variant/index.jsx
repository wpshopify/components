import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ProductContext } from '../index';


function ProductVariant({ option }) {

  const product = useContext(ProductContext);
  console.log('option ', option);
  return (

    <li
      itemProp="category"
      className="wps-product-style wps-modal-close-trigger"
      data-option-id=""
      data-variant-title=""
      data-option-position="">
      {option.value}
    </li>

  )

}

export default ProductVariant;

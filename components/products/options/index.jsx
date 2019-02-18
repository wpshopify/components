import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ProductContext } from '../index';
import ProductOption from '../option';


function ProductOptions() {

  const product = useContext(ProductContext);

  return (

    <div
      className="wps-component wps-component-products-options"
      data-wps-is-component-wrapper
      data-wps-product-id={product.id}
      data-wps-post-id=""
      data-wps-is-lite-sync="1">

      {product.options.map(option => <ProductOption key={option.id} option={option}></ProductOption>)}

    </div>

  )

}

export default ProductOptions;

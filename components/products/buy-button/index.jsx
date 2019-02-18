import React, { useContext } from 'react';
import ProductQuantity from '../quantity';
import ProductOptions from '../options';
import ProductAddButton from '../add-button';

import { ProductContext } from '../index';


function ProductBuyButton() {

  const product = useContext(ProductContext);

  return (
    <div className="wps-buy-button-wrapper">
      <ProductQuantity></ProductQuantity>
      <ProductOptions></ProductOptions>
      <ProductAddButton></ProductAddButton>
    </div>
  )

}

export default ProductBuyButton;

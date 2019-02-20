import React, { useContext } from 'react';
import ProductQuantity from '../quantity';
import ProductOptions from '../options';
import ProductAddButton from '../add-button';

function ProductBuyButton({ product }) {

   return (
      <div className="wps-buy-button-wrapper">
         <ProductQuantity product={product}></ProductQuantity>
         <ProductOptions product={product}></ProductOptions>
         <ProductAddButton product={product}></ProductAddButton>
      </div>
   )

}

export default ProductBuyButton;

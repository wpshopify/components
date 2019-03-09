import React, { useContext } from 'react';
import { ProductQuantity } from '../quantity';
import { ProductOptions } from '../options';
import { ProductAddButton } from '../add-button';

function ProductBuyButton({ product, isLoading }) {

   return (
      <div className="wps-buy-button-wrapper">
         <ProductQuantity product={product} isLoading={isLoading}></ProductQuantity>
         <ProductOptions product={product} isLoading={isLoading}></ProductOptions>
         <ProductAddButton product={product} isLoading={isLoading}></ProductAddButton>
      </div>
   )

}

export {
   ProductBuyButton
}

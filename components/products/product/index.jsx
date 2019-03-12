import 'babel-polyfill';
import React from 'react';
import { ProductTitle } from './title';
import { ProductPricing } from './pricing';
import { ProductDescription } from './description';
import { ProductBuyButton } from './buy-button';
import { ProductFeaturedImage } from './images-featured';

function Product({ product, isLoading }) {

   return (
      <div className="wps-product">
         <ProductFeaturedImage product={product} isLoading={isLoading}></ProductFeaturedImage>
         <ProductTitle product={product} isLoading={isLoading}></ProductTitle>
         <ProductPricing product={product} isLoading={isLoading}></ProductPricing>
         <ProductDescription product={product} isLoading={isLoading}></ProductDescription>
         <ProductBuyButton product={product} isLoading={isLoading}></ProductBuyButton>
      </div>
   )

}

export {
   Product
}

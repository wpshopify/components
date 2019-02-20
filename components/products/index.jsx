import 'babel-polyfill';
import React from 'react';
import ProductTitle from './title';
import ProductPricing from './pricing';
import ProductDescription from './description';
import ProductBuyButton from './buy-button';
import ProductFeaturedImage from './images-featured';

function Product({ product }) {

   return (
      <div className="wps-product">
         <ProductFeaturedImage product={product}></ProductFeaturedImage>
         <ProductTitle product={product}></ProductTitle>
         <ProductPricing product={product}></ProductPricing>
         <ProductDescription product={product}></ProductDescription>
         <ProductBuyButton product={product}></ProductBuyButton>
      </div>
   )

}

export default Product;

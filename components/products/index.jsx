import 'babel-polyfill';
import React from 'react';
import ProductTitle from './title';
import ProductPricing from './pricing';
import ProductDescription from './description';
import ProductBuyButton from './buy-button';

const ProductContext = React.createContext();

function Product({ data }) {

  return (
    <>
      <ProductContext.Provider value={data}>

        <div className="wps-product">
          <ProductTitle></ProductTitle>
          <ProductPricing></ProductPricing>
          <ProductDescription></ProductDescription>
          <ProductBuyButton></ProductBuyButton>
        </div>

      </ProductContext.Provider>

    </>
  )

}

export {
  Product,
  ProductContext
}

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductTitle from './title';

const ProductContext = React.createContext();

function Product( { data } ) {

  return (
    <>
      <ProductContext.Provider value={ data }>

        <ProductTitle></ProductTitle>

      </ProductContext.Provider>

    </>
  )

}

export {
  Product,
  ProductContext
}

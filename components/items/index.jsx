import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Product } from '../products';
// import { ProductContext } from '../index';


function Items({ data }) {

  return (
    <section className="wps-products-container">
      {
        data.map( item => (
          <Product key={ item.id } data={ item } ></Product>
        ) )
      }
    </section>
  )

}

export {
  Items
}

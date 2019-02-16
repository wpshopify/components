import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Product } from '../products';
// import { ProductContext } from '../index';


function Items({ data }) {

  return (
    <ul>
      {
        data.map( item => (
          <Product key={ item.id } data={ item } ></Product>
        ) )
      }
    </ul>
  )

}

export {
  Items
}

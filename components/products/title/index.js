import React from 'react';
import ReactDOM from 'react-dom';

function ProductTitle({ data, isReady }) {
console.log('data', data);
  return (
    <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="{ isReady }">
      { data.title }
    </h2>
  )

}

export default ProductTitle;

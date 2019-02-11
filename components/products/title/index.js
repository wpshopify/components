import React from 'react';
import ReactDOM from 'react-dom';

function ProductTitle({ data }) {

  return (
    <h2 itemProp="name" className="wps-products-title" data-wps-is-ready="1">
      { data.title }
    </h2>
  )

}

export default ProductTitle;

import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ProductContext } from '../index';
import ProductVariants from '../variants';


function ProductOption({ option }) {

  const product = useContext(ProductContext);

  return (

    <div
      className="wps-btn-dropdown wps-col wps-col-1"
      data-selected="false"
      data-active="false"
      data-open="false"
      data-option-name=""
      data-selected-val=""
      data-option="">

      <a
        href="#!"
        className="wps-btn wps-icon wps-icon-dropdown wps-modal-trigger"
        data-option=""
        data-option-id="">

        {option.name}

      </a>

      <ProductVariants option={option}></ProductVariants>

    </div>

  )

}

export default ProductOption;

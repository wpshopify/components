import React, { useContext } from 'react';
import ProductVariants from '../variants';
import { LoadingContext } from '../../../common/context';

function ProductOption({ option }) {

   const { isFiltering } = useContext(LoadingContext);

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
            data-option-id=""
            data-wps-is-ready={isFiltering ? '0' : '1'}>

            {option.name}

         </a>

         <ProductVariants option={option}></ProductVariants>

      </div>

   )

}

export default ProductOption;

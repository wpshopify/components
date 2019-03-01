import React from "react";
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import ProductVariant from '../variant';



function buildSelectedOptionsData(selectedOptions) {

   // Reduce to a single object
   return reduce(JSON.parse(selectedOptions), merge);

}


function findVariantFromSelectedOptions(product, selectedOptions) {
   return client.product.variantForOptions(product, buildSelectedOptionsData(selectedOptions));
}

function ProductVariants({ option }) {

   return (
      <ul className="wps-modal wps-variants">
         {option.values.map(optionValue => <ProductVariant key={optionValue.value} option={optionValue}></ProductVariant>)}
      </ul>
   );

}

export default ProductVariants;

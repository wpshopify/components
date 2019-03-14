import filter from 'lodash/filter';
import merge from 'lodash/merge';
import { createObj } from '../utils';

function getAvailableVariants(product) {

   let combinations = product.variants.map(variant => {
      return variant.selectedOptions.map(selectableOption => createObj(selectableOption.name, selectableOption.value));
   });

   return combinations.map(combination => {
      return merge(...combination);
   });

}

function filterAvailableVariantsBySelectedOption(product, selectedOption) {
   return filter(getAvailableVariants(product), selectedOption);
}


function addProductDetailsToVariant(variant, product) {

   var variantCopy = variant;

   variantCopy.productTitle = product.title;
   variantCopy.productId = product.id;

   return variantCopy;

}

export {
   getAvailableVariants,
   filterAvailableVariantsBySelectedOption,
   addProductDetailsToVariant
}
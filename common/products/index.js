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

export {
   getAvailableVariants,
   filterAvailableVariantsBySelectedOption
}
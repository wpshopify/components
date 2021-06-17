import { ProductOptionContext } from '../../_state/context';
import { useProductDispatch } from '../../../../_state/hooks';
import {
  createObj,
  findVariantFromVariantsList,
  isPairMatch,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

import isEmpty from 'lodash/isEmpty';

function isOptionRowSelected(productOptionState) {
  return productOptionState.isOptionSelected;
}

function isSelectedVariantAvailableToSelect(availableVariants, selectedVariant) {
  return isPairMatch(availableVariants, selectedVariant);
}

function isVariantAvailableToSelect(
  selectedOptions,
  productOptionState,
  availableVariants,
  selectedVariant,
  variants
) {
  /*
   
   If nothing is selected, then everything should be available to select
   */
  if (isEmpty(selectedOptions)) {
    return true;
  }

  /*

   If the option row is selected, then we want to ensure the rest of the 
   variants in that row are also available to select.

   */
  if (isOptionRowSelected(productOptionState)) {
    return true;
  }

  if (isSelectedVariantAvailableToSelect(availableVariants, selectedVariant)) {
    return true;
  }

  var couldSelect = { ...selectedVariant, ...selectedOptions };
  var foundVariantFromSelectedOptions = findVariantFromVariantsList(couldSelect, variants);

  if (foundVariantFromSelectedOptions.length) {
    return foundVariantFromSelectedOptions[0].availableForSale;
  } else {
    return false;
  }
}

function ProductVariant({
  variant,
  availableVariants,
  selectedOptions,
  variants = false,
  totalOptions = false,
  showPriceUnderVariantButton = false,
  children,
}) {
  const { useContext } = wp.element;
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);
  const productDispatch = useProductDispatch();
  const selectedVariant = createObj(variant.name, variant.value);

  const isAvailableToSelect = isVariantAvailableToSelect(
    selectedOptions,
    productOptionState,
    availableVariants,
    selectedVariant,
    variants
  );

  function onSelection() {
    productDispatch({
      type: 'UPDATE_SELECTED_OPTIONS',
      payload: selectedVariant,
    });

    productOptionDispatch({
      type: 'SET_SELECTED_OPTION',
      payload: selectedVariant,
    });

    productOptionDispatch({
      type: 'TOGGLE_DROPDOWN',
      payload: false,
    });

    productOptionDispatch({
      type: 'SET_IS_OPTION_SELECTED',
      payload: true,
    });

    wp.hooks.doAction('after.product.variant.selection', selectedVariant, productOptionState);
  }

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    variant: variant,
    isAvailableToSelect: isAvailableToSelect,
    selectedOptions: selectedOptions,
    variants: variants,
    totalOptions: totalOptions,
    showPriceUnderVariantButton: showPriceUnderVariantButton,
  });
}

export default ProductVariant;

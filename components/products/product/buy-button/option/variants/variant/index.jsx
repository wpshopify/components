import { ProductOptionContext } from '../../_state/context';
import { ProductContext } from '../../../../_state/context';
import { createObj, isPairMatch } from '../../../../../../../common/utils';
import isEmpty from 'lodash/isEmpty';

function ProductVariant({ variant, availableVariants, selectedOptions, children }) {
  const { useContext } = wp.element;
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);
  const [, productDispatch] = useContext(ProductContext);
  const selectedVariant = createObj(variant.name, variant.value);

  var isAvailableToSelect =
    isPairMatch(availableVariants, selectedVariant) ||
    productOptionState.isOptionSelected ||
    isEmpty(selectedOptions);

  function onSelection() {
    if (
      isPairMatch(productOptionState.selectedOption, selectedVariant) &&
      !productOptionState.isDropdownOpen
    ) {
      return;
    }

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
  });
}

export default ProductVariant;

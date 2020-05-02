import { ProductOptionContext } from '../../_state/context'
import { createObj, isPairMatch, __t } from '../../../../../../../common/utils'
import isEmpty from 'lodash/isEmpty'
const { useContext } = wp.element

function ProductVariant({
  variant,
  buyButtonDispatch,
  availableVariants,
  selectedOptions,
  children,
}) {
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  const selectedVariant = createObj(variant.name, variant.value)

  var isAvailableToSelect =
    isPairMatch(availableVariants, selectedVariant) ||
    productOptionState.isOptionSelected ||
    isEmpty(selectedOptions)

  function onSelection() {
    if (
      isPairMatch(productOptionState.selectedOption, selectedVariant) &&
      !productOptionState.isDropdownOpen
    ) {
      return
    }

    buyButtonDispatch({
      type: 'UPDATE_SELECTED_OPTIONS',
      payload: selectedVariant,
    })

    productOptionDispatch({
      type: 'SET_SELECTED_OPTION',
      payload: selectedVariant,
    })

    productOptionDispatch({
      type: 'TOGGLE_DROPDOWN',
      payload: false,
    })

    productOptionDispatch({
      type: 'SET_IS_OPTION_SELECTED',
      payload: true,
    })

    wp.hooks.doAction('after.product.variant.selection', selectedVariant, productOptionState)
  }

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    variant: variant,
    isAvailableToSelect: isAvailableToSelect,
    selectedOptions: selectedOptions,
  })
}

export default ProductVariant

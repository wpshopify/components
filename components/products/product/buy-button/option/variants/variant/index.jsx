import { ProductOptionContext } from '../../_state/context'
import { ProductBuyButtonContext } from '../../../_state/context'
import { createObj, isPairMatch } from '../../../../../../../common/utils'

const { useContext } = wp.element
const { __ } = wp.i18n

function ProductVariant({ variant, children }) {
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const selectedVariant = createObj(variant.name, variant.value)
  const isAvailableToSelect =
    isPairMatch(buyButtonState.availableVariants, selectedVariant) ||
    productOptionState.isOptionSelected ||
    productOptionState.isDropdownOpen

  function onSelection() {
    console.log('a')
    // ALREADY SELECTED
    if (
      isPairMatch(productOptionState.selectedOption, selectedVariant) &&
      !productOptionState.isDropdownOpen
    ) {
      return
    }

    buyButtonDispatch({
      type: 'UPDATE_SELECTED_OPTIONS',
      payload: selectedVariant
    })

    productOptionDispatch({
      type: 'SET_SELECTED_OPTION',
      payload: selectedVariant
    })

    productOptionDispatch({
      type: 'TOGGLE_DROPDOWN',
      payload: false
    })
    productOptionDispatch({
      type: 'SET_IS_OPTION_SELECTED',
      payload: true
    })

    wp.hooks.doAction('after.product.variant.selection', selectedVariant, productOptionState)
  }

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    variant: variant,
    isAvailableToSelect: isAvailableToSelect
  })
}

function ProductVariantDropdownValue({ variant, onSelection, isAvailableToSelect }) {
  console.log('isAvailableToSelect', isAvailableToSelect)

  return (
    isAvailableToSelect && (
      <li
        itemProp='category'
        className='wps-product-variant wps-product-style wps-modal-close-trigger'
        onClick={onSelection}>
        {wp.hooks.applyFilters(
          'products.variant.title.text',
          __(variant.value, wpshopify.misc.textdomain)
        )}
      </li>
    )
  )
}

export { ProductVariant, ProductVariantDropdownValue }

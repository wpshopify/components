import ProductVariant from './variant'
import ProductVariantDropdownValue from '../dropdown-value'
import { ProductOptionContext } from '../_state/context'
import { useOnClickOutside } from '../../../../../../common/hooks'
import { createObj, isPairMatch } from '../../../../../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'

const { useContext } = wp.element

function ProductVariantsDropdown({
  buyButtonDispatch,
  availableVariants,
  dropdownElement,
  isDropdownOpen,
  selectedOptions,
  option,
  isOptionSelected,
}) {
  console.log('option', option)
  console.log('availableVariants', availableVariants)

  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)

  function isAvail(variant) {
    const selectedVariant = createObj(variant.name, variant.value)
    return isPairMatch(availableVariants, selectedVariant) || isOptionSelected
  }

  useOnClickOutside(
    dropdownElement,
    () => {
      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
    },
    isDropdownOpen
  )

  return (
    <ul className='wps-modal wps-variants'>
      {option &&
        option.values.length &&
        option.values.map(
          (variant) =>
            (isAvail(variant) || isEmpty(selectedOptions)) && (
              <ProductVariant
                key={uuidv4()}
                variant={variant}
                buyButtonDispatch={buyButtonDispatch}
                availableVariants={availableVariants}
                selectedOptions={selectedOptions}>
                <ProductVariantDropdownValue />
              </ProductVariant>
            )
        )}
    </ul>
  )
}

export default ProductVariantsDropdown

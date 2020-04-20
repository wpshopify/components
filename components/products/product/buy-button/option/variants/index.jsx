import { ProductVariant } from './variant'
import { ProductVariantDropdownValue } from './variant'
import { ProductOptionContext } from '../_state/context'
import { ProductContext } from '../../../_state/context'
import { useOnClickOutside } from '../../../../../../common/hooks'
import { v4 as uuidv4 } from 'uuid'

const { useContext } = wp.element

function ProductVariants() {
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  const [productState, productDispatch] = useContext(ProductContext)

  function isDropdownOpen() {
    return productOptionState.isDropdownOpen
  }

  useOnClickOutside(
    productOptionState.dropdownElement,
    () => {
      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: false })
    },
    isDropdownOpen
  )

  return (
    <ul
      className='wps-modal wps-variants'
      data-wps-modal-is-open={productOptionState.isDropdownOpen}>
      {productOptionState.option.values &&
        productOptionState.option.values.map((optionValue) => (
          <ProductVariant key={uuidv4()} variant={optionValue}>
            <ProductVariantDropdownValue />
          </ProductVariant>
        ))}
    </ul>
  )
}

export { ProductVariants }

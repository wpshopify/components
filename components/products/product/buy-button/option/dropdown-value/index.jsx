import { FilterHook, __t } from '../../../../../../common/utils'

function ProductVariantDropdownValue({ onSelection, variant }) {
  return (
    <li
      itemProp='category'
      className='wps-product-variant wps-product-style wps-modal-close-trigger'
      onClick={onSelection}>
      <FilterHook name='products.variant.title.text'>{__t(variant.value)}</FilterHook>
    </li>
  )
}

export default wp.element.memo(ProductVariantDropdownValue)

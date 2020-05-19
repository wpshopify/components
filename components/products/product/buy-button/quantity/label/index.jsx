import { FilterHook } from '../../../../../../common/utils'

function ProductQuantityLabel({ showLabel, labelText }) {
  return (
    showLabel && (
      <div className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center'>
        <label htmlFor='wps-product-quantity'>
          <FilterHook name='products.quantity.label.text'>{labelText}</FilterHook>
        </label>
      </div>
    )
  )
}

export default wp.element.memo(ProductQuantityLabel)

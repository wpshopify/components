import { FilterHook, __t } from '../../../../../../common/utils'

function ProductQuantityLabel({ showQuantityLabel, label }) {
  return (
    showQuantityLabel && (
      <div className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center'>
        <label htmlFor='wps-product-quantity'>
          <FilterHook name='products.quantity.label.text'>{__t(label)}</FilterHook>
        </label>
      </div>
    )
  )
}

export { ProductQuantityLabel }

import { FilterHook, __t } from '../../../../../../common/utils'

function ProductQuantityLabel({ showLabel, labelText }) {
  console.log('<ProductQuantityLabel> :: Render Start')
  return (
    showLabel && (
      <div className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center'>
        <label htmlFor='wps-product-quantity'>
          <FilterHook name='products.quantity.label.text'>{__t(labelText)}</FilterHook>
        </label>
      </div>
    )
  )
}

export { ProductQuantityLabel }

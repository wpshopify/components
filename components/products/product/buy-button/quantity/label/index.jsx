import { FilterHook } from '../../../../../../common/utils'
const { __ } = wp.i18n

function ProductQuantityLabel({ showQuantityLabel, isShopReady, label }) {
  return (
    showQuantityLabel && (
      <div
        className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center'
        data-wps-is-ready={isShopReady ? '1' : '0'}>
        <label htmlFor='wps-product-quantity'>
          <FilterHook name='products.quantity.label.text'>
            {__(label, wpshopify.misc.textdomain)}
          </FilterHook>
        </label>
      </div>
    )
  )
}

export { ProductQuantityLabel }

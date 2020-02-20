const { __ } = wp.i18n

function ProductQuantityLabel({ showQuantityLabel, isShopReady, label }) {
  return (
    showQuantityLabel && (
      <div
        className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center'
        data-wps-is-ready={isShopReady ? '1' : '0'}>
        <label htmlFor='wps-product-quantity'>
          {wp.hooks.applyFilters(
            'products.quantity.label.text',
            __(label, wpshopify.misc.textdomain)
          )}
        </label>
      </div>
    )
  )
}

export { ProductQuantityLabel }

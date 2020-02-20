const { __ } = wp.i18n

function ProductPriceFrom() {
  return (
    <small className='wps-product-from-price'>
      {wp.hooks.applyFilters('product.pricing.from.text', __('From:', wpshopify.misc.textdomain))}
    </small>
  )
}

export { ProductPriceFrom }

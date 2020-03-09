function ProductVariantMissingSelection({ selectStyles }) {
  return (
    <p css={selectStyles}>
      {wp.hooks.applyFilters(
        'product.missingSelection.text',
        __('Please select a variation', wpshopify.misc.textdomain)
      )}
    </p>
  )
}

export default ProductVariantMissingSelection

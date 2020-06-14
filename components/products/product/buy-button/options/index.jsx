import ProductVariantDropdowns from '../variant-dropdowns'
import ProductVariantButtons from '../variant-buttons'

function ProductOptions({ variantStyle, availableOptions }) {
  return variantStyle === 'dropdown' ? (
    <ProductVariantDropdowns options={availableOptions} />
  ) : (
    wpshopify.misc.isPro && <ProductVariantButtons options={availableOptions} />
  )
}

export default ProductOptions

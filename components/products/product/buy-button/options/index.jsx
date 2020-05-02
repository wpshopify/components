import ProductVariantDropdowns from '../variant-dropdowns'
import ProductVariantButtons from '../variant-buttons'

/*

If this component is rendered, that means at least one variant is available for purchase

*/
function ProductOptions({ variantStyle, availableOptions }) {
  console.log('<ProductOptions> :: Render Start')

  return variantStyle === 'dropdown' ? (
    <ProductVariantDropdowns options={availableOptions} />
  ) : (
    <ProductVariantButtons options={availableOptions} />
  )
}

// export default wp.element.memo(ProductOptions)
export default ProductOptions

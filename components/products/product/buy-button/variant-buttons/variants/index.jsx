import { ProductVariant } from '../../option/variants/variant'

const ProductVariantButtonValue = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantButtonValue' */ '../variant')
)

function ProductVariants({ option }) {
  return option.values.map(variant => (
    <ProductVariant variant={variant}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ))
}

export default ProductVariants

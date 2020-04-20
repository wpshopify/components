import { ProductVariant } from '../../option/variants/variant'
import { v4 as uuidv4 } from 'uuid'

const ProductVariantButtonValue = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantButtonValue' */ '../variant')
)

function ProductVariants({ option }) {
  return option.values.map((variant) => (
    <ProductVariant variant={variant} key={uuidv4()}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ))
}

export default ProductVariants

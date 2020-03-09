import { ProductOptionProvider } from '../../option/_state/provider'

const ProductOptionWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionWrapper' */ '../../option/wrapper')
)

const ProductVariantButtonGroupWrapper = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductVariantButtonGroupWrapper' */ '../variant-button-group-wrapper'
  )
)

function ProductVariantButtonGroup({ option }) {
  return option ? (
    <ProductOptionProvider
      options={{
        option: option
      }}>
      <ProductOptionWrapper>
        <ProductVariantButtonGroupWrapper option={option} />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  ) : (
    ''
  )
}

export default ProductVariantButtonGroup

const ProductVariantButtonGroups = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantButtonGroups' */ './variant-button-groups')
)

function ProductVariantButtons({ options }) {
  return <ProductVariantButtonGroups options={options} />
}

export default ProductVariantButtons

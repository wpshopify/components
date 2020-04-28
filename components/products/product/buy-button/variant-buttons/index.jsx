const ProductVariantButtonGroups = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantButtonGroups' */ './variant-button-groups')
)

function ProductVariantButtons({ options }) {
  console.log('<ProductVariantButtons> :: Render Start')
  return <ProductVariantButtonGroups options={options} />
}

export default ProductVariantButtons

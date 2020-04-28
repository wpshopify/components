import { jsx, css } from '@emotion/core'

const ProductVariantButtonGroup = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantButtonGroup' */ '../variant-button-group')
)

function ProductVariantButtonGroups({ options }) {
  const styles = css`
    margin: 1em 0;
  `

  console.log('<ProductVariantButtonGroups> :: Render Start')

  return (
    options && (
      <div className='wpshopify-products-variant-buttons' css={styles}>
        {options.map(
          (option) => option && <ProductVariantButtonGroup key={option.name} option={option} />
        )}
      </div>
    )
  )
}

export default ProductVariantButtonGroups

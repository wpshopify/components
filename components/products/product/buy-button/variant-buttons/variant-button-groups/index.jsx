import { jsx, css } from '@emotion/core'

import ProductVariantButtonGroup from '../variant-button-group'

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

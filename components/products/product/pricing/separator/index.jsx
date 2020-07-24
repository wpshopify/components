/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPricingSeparator() {
  const ProductPricingSeparatorCSS = css`
    margin: 0 3px;
    display: inline-block;
  `

  return (
    <div css={ProductPricingSeparatorCSS} className='wps-product-from-price-separator'>
      –
    </div>
  )
}

export { ProductPricingSeparator }

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPricingSeparator() {
  const styles = css`
    margin: 0 5px;
    display: inline-block;
  `

  return (
    <div css={styles} className='wps-product-from-price-separator'>
      –
    </div>
  )
}

export { ProductPricingSeparator }

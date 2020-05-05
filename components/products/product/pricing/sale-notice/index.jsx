/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPriceSaleNotice({ showPriceRange, selectedVariant }) {
  const styles = css`
    && {
      color: red;
      margin: ${showPriceRange && !selectedVariant ? '15px 10px 15px 0' : '15px 10px 15px 17px'};
      font-size: 16px;
    }
  `

  return (
    <small className='wps-pricing-sale-notice' css={styles}>
      Sale!
    </small>
  )
}

export default wp.element.memo(ProductPriceSaleNotice)

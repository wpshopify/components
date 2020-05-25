/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPriceSaleNotice({ showPriceRange, selectedVariant }) {
  const styles = css`
    && {
      color: red;
      margin: ${showPriceRange && !selectedVariant ? '0 10px 14px 0' : '0px 7px 14px 15px'};
      font-size: 15px;
    }
  `

  return (
    <small className='wps-pricing-sale-notice' css={styles}>
      {wp.i18n.__('Sale!', 'wpshopify')}
    </small>
  )
}

export default wp.element.memo(ProductPriceSaleNotice)

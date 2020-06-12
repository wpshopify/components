/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPriceSaleNotice() {
  const ProductPriceSaleNoticeCSS = css`
    && {
      color: red;
      margin: 0 10px 0 0;
      font-size: 15px;
      line-height: 1;
    }
  `

  return (
    <small className='wps-pricing-sale-notice' css={ProductPriceSaleNoticeCSS}>
      {wp.i18n.__('Sale!', 'wpshopify')}
    </small>
  )
}

export default wp.element.memo(ProductPriceSaleNotice)

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { shouldShowSaleNotice } from '../../../../../common/pricing/data'
import { FilterHook } from '../../../../../common/utils'

function ProductPriceSaleNotice({ selectedVariant, prices, showPriceRange, children }) {
  const ProductPriceSaleNoticeCSS = css`
    && {
      color: red;
      margin: 0 7px 0 0;
      font-size: 15px;
      line-height: 1;
      font-style: normal;
    }
  `

  const ProductPriceSalePriceCSS = css`
    margin: 0 5px 0 0;
    font-size: 15px;
    line-height: 1;
    color: #848484;
    font-style: normal;
  `

  return shouldShowSaleNotice(selectedVariant, prices) ? (
    <>
      <small className='wps-pricing-sale-notice' css={ProductPriceSaleNoticeCSS}>
        {wp.i18n.__('Sale!', 'wpshopify')}
      </small>
      <small className='wps-pricing-sale-price' css={ProductPriceSalePriceCSS}>
        <FilterHook name='product.pricing.from.text'>{wp.i18n.__('Was: ', 'wpshopify')}</FilterHook>
      </small>

      {children}
    </>
  ) : null
}

export default wp.element.memo(ProductPriceSaleNotice)

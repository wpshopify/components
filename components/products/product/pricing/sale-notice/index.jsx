/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { shouldShowSaleNotice, getSalePrice } from '../../../../../common/pricing/data'
import { FilterHook } from '../../../../../common/utils'
import PrettyPrice from '../../../../../common/pricing/pretty'

function ProductPriceSaleNotice({ selectedVariant, prices, currencyCode }) {
  const ProductPriceSaleNoticeCSS = css`
    && {
      color: red;
      margin: 0 7px 0 0;
      font-size: 15px;
      line-height: 1;
    }
  `

  const ProductPriceSalePriceCSS = css`
    margin: 0;
    font-size: 15px;
    line-height: 1;
    color: #848484;
    text-decoration: line-through;
  `

  return (
    shouldShowSaleNotice(selectedVariant, prices) && (
      <>
        <small className='wps-pricing-sale-notice' css={ProductPriceSaleNoticeCSS}>
          {wp.i18n.__('Sale!', 'wpshopify')}
        </small>
        <small className='wps-pricing-sale-price' css={ProductPriceSalePriceCSS}>
          <FilterHook name='product.pricing.from.text'>
            {wp.i18n.__('Was: ', 'wpshopify')}
          </FilterHook>
          <PrettyPrice price={getSalePrice(selectedVariant, prices)} currencyCode={currencyCode} />
        </small>
      </>
    )
  )
}

export default wp.element.memo(ProductPriceSaleNotice)

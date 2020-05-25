/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../common/utils'

import ProductPriceSaleNotice from '../sale-notice'

function ProductPriceFrom({ compareAt, showPriceRange, selectedVariant }) {
  const fromCSS = css`
    margin-right: 5px;
    font-size: 15px;
  `

  return compareAt ? (
    <ProductPriceSaleNotice
      compareAt={compareAt}
      showPriceRange={showPriceRange}
      selectedVariant={selectedVariant}
    />
  ) : (
    <small css={fromCSS} className='wps-product-from-price'>
      <FilterHook name='product.pricing.from.text' args={[compareAt]}>
        {wp.i18n.__('Price:', 'wpshopify')}
      </FilterHook>
    </small>
  )
}

export default wp.element.memo(ProductPriceFrom)

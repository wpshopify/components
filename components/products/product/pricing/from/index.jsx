/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../common/utils'

function ProductPriceFrom({ compareAt }) {
  const fromCSS = css`
    margin-right: 5px;
    font-size: 15px;
    font-style: none;
  `

  return (
    !compareAt && (
      <small css={fromCSS} className='wps-product-from-price'>
        <FilterHook name='product.pricing.from.text' args={[compareAt]}>
          {wp.i18n.__('Price:', 'wpshopify')}
        </FilterHook>
      </small>
    )
  )
}

export default wp.element.memo(ProductPriceFrom)

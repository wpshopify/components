/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../common/utils'
const { __ } = wp.i18n

function ProductPriceFrom() {
  const styles = css`
    margin-right: 5px;
    font-size: 15px;
  `

  return (
    <small css={styles} className='wps-product-from-price'>
      <FilterHook name='product.pricing.from.text'>
        {__('From:', wpshopify.misc.textdomain)}
      </FilterHook>
    </small>
  )
}

export { ProductPriceFrom }

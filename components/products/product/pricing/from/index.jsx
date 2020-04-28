/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook, __t } from '../../../../../common/utils'

function ProductPriceFrom() {
  const styles = css`
    margin-right: 5px;
    font-size: 15px;
  `

  return (
    <small css={styles} className='wps-product-from-price'>
      <FilterHook name='product.pricing.from.text'>{__t('Price:')}</FilterHook>
    </small>
  )
}

export { ProductPriceFrom }

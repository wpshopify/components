/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook, __t } from '../../../../../common/utils'

function ProductPriceFrom({ compareAt }) {
  const styles = css`
    margin-right: 5px;
    font-size: 15px;
  `
  console.log('compareAtcompareAtcompareAt', compareAt)

  return (
    <small css={styles} className='wps-product-from-price'>
      <FilterHook name='product.pricing.from.text' args={[compareAt]}>
        {__t(compareAt ? 'Was:' : 'Price:')}
      </FilterHook>
    </small>
  )
}

export { ProductPriceFrom }

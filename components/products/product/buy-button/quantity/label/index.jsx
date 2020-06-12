/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../../common/utils'

function ProductQuantityLabel({ showLabel, labelText }) {
  const ProductQuantityLabelCSS = css`
    display: inline-block;
    margin: 0;
  `

  return (
    showLabel && (
      <div className='wps-quantity-input wps-quantity-label-wrapper' css={ProductQuantityLabelCSS}>
        <label htmlFor='wps-product-quantity'>
          <FilterHook name='products.quantity.label.text'>{labelText}</FilterHook>
        </label>
      </div>
    )
  )
}

export default wp.element.memo(ProductQuantityLabel)

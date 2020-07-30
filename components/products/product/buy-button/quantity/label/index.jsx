/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../../common/utils'

function ProductQuantityLabel({ showLabel, labelText }) {
  const ProductQuantityLabelWrapperCSS = css`
    display: inline-block;
    margin: 0;
  `

  const ProductQuantityLabelCSS = css`
    font-weight: normal;
    color: #121212;
  `

  return (
    showLabel && (
      <div
        className='wps-quantity-input wps-quantity-label-wrapper'
        css={ProductQuantityLabelWrapperCSS}>
        <label htmlFor='wps-product-quantity' css={ProductQuantityLabelCSS}>
          <FilterHook name='products.quantity.label.text'>{labelText}</FilterHook>
        </label>
      </div>
    )
  )
}

export default wp.element.memo(ProductQuantityLabel)

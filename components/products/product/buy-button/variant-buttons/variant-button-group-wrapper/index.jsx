/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductBuyButtonContext } from '../../_state/context'
import { ProductOptionContext } from '../../option/_state/context'

const ProductVariantMissingSelection = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantMissingSelection' */ '../missing-selection')
)

const ProductVariants = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariants' */ '../variants')
)

const { useRef, useContext } = wp.element

function ProductVariantButtonGroupWrapper({ option }) {
  const [buyButtonState] = useContext(ProductBuyButtonContext)
  const [productOptionState] = useContext(ProductOptionContext)
  const variantGroup = useRef()

  const labelStyles = css`
    label {
      margin-botton: 5px;
    }
  `

  const groupStyles = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  `

  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `

  return (
    <div className='wpshopify-variant-buttons-group' css={groupStyles}>
      <label css={labelStyles}>{option.name}</label>
      <div className='wpshopify-variant-buttons' ref={variantGroup}>
        <ProductVariants option={option} />
      </div>
      {buyButtonState.missingSelections && !productOptionState.isOptionSelected && (
        <ProductVariantMissingSelection selectStyles={selectStyles} />
      )}
    </div>
  )
}

export default ProductVariantButtonGroupWrapper

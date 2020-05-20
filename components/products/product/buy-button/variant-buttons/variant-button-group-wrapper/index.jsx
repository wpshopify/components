/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductBuyButtonContext } from '../../_state/context'
import { ProductOptionContext } from '../../option/_state/context'
import ProductVariantMissingSelection from '../missing-selection'
import ProductVariantsButtons from '../variants'

const { useRef, useContext } = wp.element

function ProductVariantButtonGroupWrapper({ option }) {
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
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

  return (
    <div className='wpshopify-variant-buttons-group' css={groupStyles}>
      <label css={labelStyles}>{option.name}</label>
      <div className='wpshopify-variant-buttons' ref={variantGroup}>
        <ProductVariantsButtons
          option={option}
          buyButtonDispatch={buyButtonDispatch}
          availableVariants={buyButtonState.availableVariants}
          selectedOptions={buyButtonState.selectedOptions}
        />
      </div>
      {buyButtonState.missingSelections && !productOptionState.isOptionSelected && (
        <ProductVariantMissingSelection />
      )}
    </div>
  )
}

export default ProductVariantButtonGroupWrapper

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductOptionProvider } from '../option/_state/provider'
import { ProductVariantButtonValue } from './variant'
import { ProductVariant } from '../option/variants/variant'
import { ProductOptionWrapper } from '../option/wrapper'
import { ProductBuyButtonContext } from '../_state/context'
import { ProductOptionContext } from '../option/_state/context'
const { useRef, useContext } = wp.element
const { __ } = wp.i18n

function VariantButtonGroup({ option }) {
  return (
    <ProductOptionProvider
      options={{
        option: option
      }}>
      <ProductOptionWrapper>
        <VariantButtonGroupWrapper option={option} />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  )
}

function VariantButtonGroupWrapper({ option }) {
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
    <div class='wpshopify-variant-buttons-group' css={groupStyles}>
      <label css={labelStyles}>{option.name}</label>
      <div class='wpshopify-variant-buttons' ref={variantGroup}>
        <ProductVariants option={option} />
      </div>
      {buyButtonState.missingSelections && !productOptionState.isOptionSelected && (
        <MissingSelection selectStyles={selectStyles} />
      )}
    </div>
  )
}

function MissingSelection({ selectStyles }) {
  return <p css={selectStyles}>{__('Please select a variation', wpshopify.misc.textdomain)}</p>
}

function ProductVariants({ option }) {
  return option.values.map(variant => (
    <ProductVariant variant={variant}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ))
}

function VariantButtonGroups({ options }) {
  const styles = css`
    margin: 1em 0;
  `
  return (
    <div className='wpshopify-products-variant-dropdowns' css={styles}>
      {options.map(option => (
        <VariantButtonGroup key={option.name} option={option} />
      ))}
    </div>
  )
}

function VariantButtons({ options }) {
  return options && <VariantButtonGroups options={options} />
}

export { VariantButtons }

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductOptionProvider } from '../option/_state/provider'
import { ProductVariantButtonValue } from './variant'
import { ProductVariant } from '../option/variants/variant'

function VariantButtonGroup({ option }) {
  return (
    <ProductOptionProvider
      options={{
        option: option
      }}>
      <VariantButtonGroupWrapper option={option} />
    </ProductOptionProvider>
  )
}

function VariantButtonGroupWrapper({ option }) {
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
    <div class='wpshopify-variant-buttons-group' css={groupStyles}>
      <label css={labelStyles}>{option.name}</label>
      <div class='wpshopify-variant-buttons'>
        <ProductVariants option={option} />
      </div>
    </div>
  )
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

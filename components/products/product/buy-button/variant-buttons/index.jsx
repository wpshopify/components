/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductVariantButtonsProvider } from './_state/provider'

import { ProductOptionContext } from '../option/_state/context'
import { ProductOptionProvider } from '../option/_state/provider'
import { ProductBuyButtonContext } from '../_state/context'

import { ProductVariantButtonValue } from './variant'
import { ProductVariant } from '../option/variants/variant'

const { useContext, useEffect } = wp.element

function VariantButtonGroup({ option }) {
  console.log('option', option)

  //   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  //   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)

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

  //   useEffect(() => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false
  //       return
  //     }

  //     buyButtonDispatch({
  //       type: 'SET_AVAILABLE_VARIANTS',
  //       payload: productOptionState.selectedOption
  //     })
  //   }, [productOptionState.selectedOption])

  return (
    <ProductOptionProvider
      options={{
        option: option
      }}>
      <div class='wpshopify-variant-buttons-group' css={groupStyles}>
        <label css={labelStyles}>{option.name}</label>
        <div class='wpshopify-variant-buttons'>
          {option.values.map(variant => (
            <ProductVariant variant={variant}>
              <ProductVariantButtonValue />
            </ProductVariant>
          ))}
        </div>
      </div>
    </ProductOptionProvider>
  )
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
  return (
    options && (
      <ProductVariantButtonsProvider options={options}>
        <VariantButtonGroups options={options} />
      </ProductVariantButtonsProvider>
    )
  )
}

export { VariantButtons }

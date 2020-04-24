import { FilterHook } from '../../../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { __ } = wp.i18n

function CartLineItemVariantTitle({ lineItem, isReady }) {
  const badgeCSS = css`
    display: inline-block;
    width: auto;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 16px;
    color: white;
    background-color: #415aff;
    border-radius: 10rem;
    padding: 0.25em 0.6em;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    flex: 0 0 100%;
    max-width: 100%;
    letter-spacing: 0.02em;
    line-height: 1.4;
    margin: 5px 0 10px 0;
  `

  return (
    <div css={badgeCSS} className='wps-cart-lineitem-variant-title' data-wps-is-ready={isReady}>
      <FilterHook name='cart.lineItem.variant.title'>
        {__(lineItem.title, wpshopify.misc.textdomain)}
      </FilterHook>
    </div>
  )
}

export { CartLineItemVariantTitle }

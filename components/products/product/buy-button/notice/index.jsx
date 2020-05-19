import { ProductBuyButtonContext } from '../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function ProductBuyButtonTextNotice({ quantityLeft }) {
  const [buyButtonState] = useContext(ProductBuyButtonContext)

  const textNoticeCSS = css`
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    padding: 10px;
    color: red;
    width: 100%;
    font-weight: normal;
    margin: 0 auto;
    display: block;
  `

  return (
    buyButtonState.allOptionsSelected &&
    quantityLeft && (
      <span className='wps-notice-text' css={textNoticeCSS}>
        {wp.i18n.sprintf(wp.i18n.__('Only %s left!', 'wpshopify'), quantityLeft)}
      </span>
    )
  )
}

export { ProductBuyButtonTextNotice }

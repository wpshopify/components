/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function ProductBuyButtonTextNotice({ quantityLeft }) {
  const textNoticeCSS = css`
    text-align: center;
    margin: 5px auto 2.4em auto;
    font-size: 15px;
    padding: 10px;
    color: red;
    width: 100%;
    font-weight: normal;
    display: block;
  `

  return (
    <span className='wps-notice-text' css={textNoticeCSS}>
      {
        /* translators: %s: Only 9 left */
        wp.i18n.sprintf(wp.i18n.__('Only %s left!', 'wpshopify'), quantityLeft)
      }
    </span>
  )
}

export { ProductBuyButtonTextNotice }

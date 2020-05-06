import { ProductBuyButtonContext } from '../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { __t } from '../../../../../common/utils'
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
        {__t(`Only ${quantityLeft} left!`)}
      </span>
    )
  )
}

export { ProductBuyButtonTextNotice }

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
    display: inline;
    color: #d9870c;
    font-weight: bold;
  `

  return (
    buyButtonState.allOptionsSelected &&
    quantityLeft && (
      <strong className='wps-notice-text' css={textNoticeCSS}>
        {__t(`Only ${quantityLeft} left!`)}
      </strong>
    )
  )
}

export { ProductBuyButtonTextNotice }

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { fadeInRightSlow, useAnime } from '../../../../common/animations'
import { CartContext } from '../../_state/context'
import { FilterHook } from '../../../../common/utils'
import { getCurrencyCodeFromPayload } from '../../../../common/pricing/data'
import PrettyPrice from '../../../../common/pricing/pretty'

function CartFooterTotal({ totalElement }) {
  const { useContext, useEffect } = wp.element
  const animeFadeInRightSlow = useAnime(fadeInRightSlow)
  const [cartState] = useContext(CartContext)

  const footerStyles = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `

  useEffect(() => {
    if (!cartState.total) {
      return
    }
    animeFadeInRightSlow(totalElement.current)
  }, [cartState.total])

  return (
    <div css={footerStyles}>
      <CartFooterSubtotalLabel />
      <CartFooterSubtotalAmount
        total={cartState.total}
        currencyCode={getCurrencyCodeFromPayload(cartState.checkoutCache)}
        totalElement={totalElement}
      />
    </div>
  )
}

function CartFooterSubtotalLabel() {
  return (
    <p className='wps-total-prefix'>
      <FilterHook name='cart.subtotal.text'>{wp.i18n.__('Subtotal:', 'wpshopify')}</FilterHook>
    </p>
  )
}

function CartFooterSubtotalAmount({ total, currencyCode, totalElement }) {
  const CartFooterSubtotalAmountCSS = css`
    font-weight: bold;
    text-align: right;
    font-size: 28px;
  `

  return (
    <p className='wps-total-amount' ref={totalElement} css={CartFooterSubtotalAmountCSS}>
      <PrettyPrice price={total} currencyCode={currencyCode} />
    </p>
  )
}

export { CartFooterTotal }

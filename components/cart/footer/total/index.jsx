import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { fadeInRightSlow, useAnime } from '../../../../common/animations'
import { CartContext } from '../../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
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
  return (
    <p className='wps-total-amount col p-0' ref={totalElement}>
      <PrettyPrice price={total} currencyCode={currencyCode} />
    </p>
  )
}

export { CartFooterTotal }

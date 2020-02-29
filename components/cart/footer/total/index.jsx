import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { pulse, useAnime } from '../../../../common/animations'
import { CartContext } from '../../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext, useEffect } = wp.element
const { __ } = wp.i18n

function CartFooterTotal({ isReady, totalElement, currencyCode }) {
  const animate = useAnime(pulse)
  const [cartState] = useContext(CartContext)

  const footerStyles = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `

  useEffect(() => {
    if (!isReady) {
      return
    }
    animate(totalElement.current)
  }, [cartState.total])

  return (
    <div css={footerStyles}>
      <CartFooterSubtotalLabel />
      <CartFooterSubtotalAmount
        total={cartState.total}
        currencyCode={currencyCode}
        totalElement={totalElement}
        isReady={isReady}
      />
    </div>
  )
}

function CartFooterSubtotalLabel() {
  return (
    <p className='wps-total-prefix'>
      {wp.hooks.applyFilters('cart.subtotal.text', __('Subtotal:', wpshopify.misc.textdomain))}
    </p>
  )
}

function CartFooterSubtotalAmount({ total, currencyCode, totalElement, isReady }) {
  return (
    <p
      className='wps-total-amount col p-0'
      ref={totalElement}
      data-wps-is-ready={isReady ? '1' : '0'}>
      {isReady && formatPriceToCurrency(total, currencyCode)}
    </p>
  )
}

export { CartFooterTotal }

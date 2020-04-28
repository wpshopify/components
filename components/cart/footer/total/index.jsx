import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { pulse, useAnime } from '../../../../common/animations'
import { CartContext } from '../../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook, __t } from '../../../../common/utils'
import { getCurrencyCodeFromPayload } from '../../../../common/pricing/data'

const { useContext, useEffect } = wp.element

function CartFooterTotal({ totalElement }) {
  const animate = useAnime(pulse)
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
    animate(totalElement.current)
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
      <FilterHook name='cart.subtotal.text'>{__t('Subtotal:')}</FilterHook>
    </p>
  )
}

function CartFooterSubtotalAmount({ total, currencyCode, totalElement }) {
  return (
    <p className='wps-total-amount col p-0' ref={totalElement}>
      {formatPriceToCurrency(total, currencyCode)}
    </p>
  )
}

export { CartFooterTotal }

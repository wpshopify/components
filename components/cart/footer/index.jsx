/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartContext } from '../_state/context'
import { CartCheckout } from '../checkout'
import { CartNote } from '../note'
import { CartTerms } from '../terms'
import { Notices } from '../../notices'
import { CartFooterTotal } from './total'

import isEmpty from 'lodash/isEmpty'

function CartFooter() {
  const { useContext, useRef } = wp.element
  const [cartState] = useContext(CartContext)
  const totalElement = useRef()

  const CartFooterCSS = css`
    padding: 1em 0 0 0;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    border-top: 1px solid #ddd;
    font-size: 26px;

    p {
      margin: 0;
    }

    .wps-total-prefix {
      font-size: 20px;
    }
  `

  return (
    <>
      <section className='wps-cart-footer' css={CartFooterCSS}>
        {wpshopify.settings.general.enableCartNotes && <CartNote />}
        {wpshopify.settings.general.enableCartTerms && <CartTerms />}
        {!isEmpty(cartState.notices) && <Notices notices={cartState.notices} noticeGroup='cart' />}
        <CartFooterTotal totalElement={totalElement} />
        <CartCheckout />
      </section>
    </>
  )
}

export default CartFooter

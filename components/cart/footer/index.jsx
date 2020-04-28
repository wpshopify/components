import { CartContext } from '../_state/context'
import { CartCheckout } from '../checkout'
import { CartNote } from '../note'
import { CartTerms } from '../terms'
import { Notices } from '../../notices'
import { CartFooterTotal } from './total'

import isEmpty from 'lodash/isEmpty'

const { useContext, useRef } = wp.element

function CartFooter() {
  const [cartState] = useContext(CartContext)
  const totalElement = useRef()

  return (
    <>
      <section className='wps-cart-footer'>
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

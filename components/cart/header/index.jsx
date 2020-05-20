import { CartTitle } from '../title'
import { CartClose } from '../close'
import { useAction } from '../../../common/hooks'
import { containerFluidCSS } from '../../../common/css'

function CartHeader({ cartState, cartDispatch }) {
  const isShowingTitle = useAction('show.cart.title', true)
  const isShowingClose = useAction('show.cart.close', true)

  return (
    <section className='wps-cart-header' css={containerFluidCSS}>
      <div className='row'>
        {isShowingTitle && <CartTitle cartState={cartState} />}
        {isShowingClose && <CartClose cartDispatch={cartDispatch} />}
      </div>
    </section>
  )
}

export default CartHeader

import { ShopContext } from '../../../shop/_state/context'
import { CartContext } from '../../_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'

const { useContext, useRef, useEffect } = wp.element

function CartButton({ options }) {
  const [shopState] = useContext(ShopContext)
  const [cartState, cartDispatch] = useContext(CartContext)
  const counterElement = useRef()
  const animeSlideInRight = useAnime(slideInRight)

  useEffect(() => {
    if (!shopState.isShopReady) {
      return
    }

    if (options.payloadSettings.type === 'fixed' && shopState.settings.general.showFixedCartTab) {
      animeSlideInRight(counterElement.current)
    }
  }, [shopState.isShopReady])

  function getIconColor() {
    if (options.payloadSettings.type === 'fixed') {
      return shopState.settings.general.cartFixedBackgroundColor
    }

    return ''
  }

  function iconStyles() {
    return {
      backgroundColor: getIconColor(),
    }
  }

  function onClick() {
    cartDispatch({ type: 'TOGGLE_CART', payload: true })
  }

  function onEnter() {
    cartDispatch({ type: 'CART_LOADED', payload: true })
  }

  return usePortal(
    <CartButtonProvider options={options}>
      <button
        data-is-cart-ready={shopState.isCartReady ? '1' : '0'}
        role='button'
        ref={counterElement}
        className={`wps-btn-cart wps-cart-icon-${options.payloadSettings.type} ${
          isCartEmpty(cartState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''
        }`}
        onClick={onClick}
        onMouseEnter={onEnter}
        style={iconStyles()}>
        {options.payloadSettings.showCounter && <CartCounter />}

        <CartIcon />
      </button>
    </CartButtonProvider>,
    options.componentElement
  )
}

export { CartButton }

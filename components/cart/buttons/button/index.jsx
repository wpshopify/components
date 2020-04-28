import { CartContext } from '../../_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'

const { useContext, useRef, useEffect } = wp.element

function CartButton({ options }) {
  const [cartState, cartDispatch] = useContext(CartContext)
  const counterElement = useRef()
  const animeSlideInRight = useAnime(slideInRight)

  useEffect(() => {
    if (options.payloadSettings.type === 'fixed' && wpshopify.settings.general.showFixedCartTab) {
      animeSlideInRight(counterElement.current)
    }
  }, [])

  function getIconColor() {
    if (options.payloadSettings.type === 'fixed') {
      return wpshopify.settings.general.cartFixedBackgroundColor
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

  function onMouseOver() {
    cartDispatch({ type: 'CART_LOADED', payload: true })
  }

  return usePortal(
    <CartButtonProvider options={options}>
      <button
        data-is-cart-ready={cartState.isCartReady ? '1' : '0'}
        role='button'
        ref={counterElement}
        className={`wps-btn-cart wps-cart-icon-${options.payloadSettings.type} ${
          isCartEmpty(cartState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''
        }`}
        onClick={onClick}
        onMouseOver={onMouseOver}
        style={iconStyles()}>
        {options.payloadSettings.showCounter && <CartCounter />}

        <CartIcon />
      </button>
    </CartButtonProvider>,
    options.componentElement
  )
}

export { CartButton }

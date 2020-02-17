import { ShopContext } from '../../../shop/_state/context'
import { CartContext } from '../../_state/context'
import { CartButtonContext } from '../button/_state/context'
import { Loader } from '../../../loader'
import { findTotalCartQuantities } from '../../../../common/cart'
import { useAnime, pulse } from '../../../../common/animations'

const { useContext, useState, useRef, useEffect } = wp.element

function CartCounter() {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [shopState] = useContext(ShopContext)
  const [totalItems, setTotalItems] = useState(
    findTotalCartQuantities(cartState.checkoutCache.lineItems)
  )
  const [cartButtonState] = useContext(CartButtonContext)
  const animePulse = useAnime(pulse)
  const element = useRef()

  useEffect(() => {
    if (!shopState.isCartReady) {
      return
    }

    const total = findTotalCartQuantities(cartState.checkoutCache.lineItems)

    setTotalItems(total)
    animePulse(element.current)
  }, [shopState.isCartReady, cartState.totalLineItems])

  function counterStyles() {
    return {
      backgroundColor: getBackgroundColor(),
      color: getColor()
    }
  }

  function getColor() {
    if (!cartButtonState.payloadSettings.counterTextColor) {
      if (cartButtonState.payloadSettings.type !== 'fixed') {
        return '#000'
      }
    }

    if (cartButtonState.payloadSettings.type !== 'fixed') {
      return cartButtonState.payloadSettings.counterTextColor
    }

    return shopState.settings.general.cartCounterFixedColor
  }

  function getBackgroundColor() {
    if (!cartButtonState.payloadSettings.counterBackgroundColor) {
      if (cartButtonState.payloadSettings.type !== 'fixed') {
        return shopState.settings.general.cartCounterColor
      }
    }

    return cartButtonState.payloadSettings.counterBackgroundColor
  }

  return (
    <>
      <span
        style={counterStyles(cartButtonState)}
        data-wps-is-big={totalItems > 9 ? true : false}
        className='wps-cart-counter'
        ref={element}>
        {!shopState.isCartReady ? <Loader isLoading={true} /> : totalItems}
      </span>
    </>
  )
}

export { CartCounter }

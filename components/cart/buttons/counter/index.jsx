import { CartContext } from '../../_state/context'
import { CartButtonContext } from '../button/_state/context'
import { Loader } from '../../../loader'
import { findTotalCartQuantities } from '../../../../common/cart'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext, useState, useRef, useEffect } = wp.element

function CartCounter() {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [totalItems, setTotalItems] = useState(() =>
    findTotalCartQuantities(cartState.checkoutCache.lineItems)
  )
  const [cartButtonState] = useContext(CartButtonContext)
  const element = useRef()

  useEffect(() => {
    const total = findTotalCartQuantities(cartState.checkoutCache.lineItems)

    setTotalItems(total)
  }, [cartState.totalLineItems])

  function getColor() {
    if (cartButtonState.payloadSettings.type === 'fixed') {
      return cartButtonState.payloadSettings.fixedCounterColor
    }

    if (cartButtonState.payloadSettings.type === 'inline') {
      return cartButtonState.payloadSettings.inlineCartCounterTextColor
    }
  }

  function getBackgroundColor() {
    if (cartButtonState.payloadSettings.type === 'fixed') {
      return cartButtonState.payloadSettings.fixedBackgroundColor
    }

    if (cartButtonState.payloadSettings.type === 'inline') {
      return cartButtonState.payloadSettings.inlineBackgroundColor
    }
  }

  const counterCSS = css`
    position: ${cartButtonState.payloadSettings.type === 'fixed' ? 'relative' : 'absolute'};
    font-weight: normal;
    top: ${cartButtonState.payloadSettings.type === 'fixed' ? '-8px' : '-12px'};
    right: -12px;
    left: ${cartButtonState.payloadSettings.type === 'fixed' ? '1px' : 'auto'};
    background: ${cartButtonState.payloadSettings.type === 'fixed' ? 'none' : '#6ae06a'};
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: ${cartButtonState.payloadSettings.type === 'fixed' ? 'white' : 'black'};
    font-size: ${cartButtonState.payloadSettings.type === 'fixed' ? '18px' : '13px'};
    line-height: 1.9;
    z-index: 3;
    width: ${cartButtonState.payloadSettings.type === 'fixed' ? 'auto' : '25px'};
    height: 25px;
    max-height: 25px;
    padding: 0px;
    font-weight: bold;
    overflow: ${cartButtonState.payloadSettings.type === 'fixed' ? 'visible' : 'hidden'};
  `
  const customCounterCSS = css`
    background-color: ${getBackgroundColor()};
    color: ${getColor()};
  `

  return (
    <span css={[counterCSS, customCounterCSS]} className='wps-cart-counter' ref={element}>
      {!cartState.isCartReady ? <Loader isLoading={true} /> : totalItems}
    </span>
  )
}

export { CartCounter }

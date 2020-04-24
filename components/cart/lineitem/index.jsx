import { CartContext } from '../../cart/_state/context'
import { ShopContext } from '../../shop/_state/context'

import { CartLineItemQuantity } from './quantity'
import { CartLineItemPrice } from './price'
import { CartLineItemImage } from './image'
import { CartLineItemOutOfStock } from './out-of-stock'
import { CartLineItemTitle } from './title'
import { CartLineItemRemove } from './remove'
import { CartLineItemVariantTitle } from './variant-title'

import { calcLineItemTotal, isAvailable } from '../../../common/products'
import { containerFluidCSS, flexRowCSS, flexColSmallCSS } from '../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import find from 'lodash/find'

const { useContext, useState, useRef, useEffect } = wp.element

function CartLineItem({ lineItem }) {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [shopState] = useContext(ShopContext)

  const [isUpdating] = useState(() => false)
  const [lineItemQuantity, setLineItemQuantity] = useState(() => 0)
  const [lineItemTotal, setLineItemTotal] = useState(() => 0)

  const variantId = useRef(false)
  const lineItemElement = useRef()
  const isFirstRender = useRef(true)
  const lineItemTotalElement = useRef()

  function onRemove(e) {
    cartDispatch({
      type: 'REMOVE_LINE_ITEM',
      payload: {
        lineItem: variantId.current,
        checkoutId: shopState.checkoutId,
      },
    })

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: 0,
        },
        checkoutId: shopState.checkoutId,
      },
    })
  }

  function getLineItemFromState() {
    return find(cartState.checkoutCache.lineItems, { variantId: lineItem.id })
  }

  function hasRealVariant() {
    return lineItem.title !== 'Default Title'
  }

  useEffect(() => {
    let lineItemFound = getLineItemFromState()

    if (lineItemFound) {
      variantId.current = lineItemFound.variantId

      setLineItemQuantity(lineItemFound.quantity)
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFound.quantity))
    }
  }, [cartState.checkoutCache.lineItems])

  const lineItemStyles = css`
    margin-top: 0;
    margin-bottom: 40px;
    min-height: 100px;
    position: relative;
    display: flex;
    top: -50px;
  `

  return (
    <div
      className='wps-cart-lineitem'
      data-wps-is-updating={isUpdating}
      data-wps-is-available={isAvailable(lineItem)}
      ref={lineItemElement}
      css={lineItemStyles}>
      <CartLineItemImage lineItem={lineItem} shopState={shopState} cartState={cartState} />

      <div className='wps-cart-lineitem-content'>
        <div
          className='wps-cart-lineitem-title col-12 p-0'
          data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
          data-wps-is-empty={hasRealVariant() ? 'false' : 'true'}>
          <div className='p-0' css={containerFluidCSS}>
            <div css={flexRowCSS}>
              <CartLineItemTitle lineItem={lineItem} />
              <CartLineItemRemove onRemove={onRemove} />
            </div>
          </div>
        </div>

        {hasRealVariant() && (
          <CartLineItemVariantTitle isReady={shopState.isCartReady} lineItem={lineItem} />
        )}

        {!isAvailable(lineItem) ? (
          <CartLineItemOutOfStock />
        ) : (
          <div className='p-0' css={containerFluidCSS}>
            <div css={[flexRowCSS, flexColSmallCSS]}>
              <CartLineItemQuantity
                lineItem={lineItem}
                variantId={variantId}
                lineItemQuantity={lineItemQuantity}
                setLineItemQuantity={setLineItemQuantity}
                isReady={shopState.isCartReady}
                isFirstRender={isFirstRender}
                setLineItemTotal={setLineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
              />

              <CartLineItemPrice
                isReady={shopState.isCartReady}
                lineItemTotal={lineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
                shopState={shopState}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { CartLineItem }

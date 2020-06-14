import { CartContext } from '../../cart/_state/context'

import { CartLineItemQuantity } from './quantity'
import CartLineItemPrice from './price'
import { CartLineItemImage } from './image'
import { CartLineItemOutOfStock } from './out-of-stock'
import { CartLineItemTitle } from './title'
import { CartLineItemRemove } from './remove'
import CartLineItemVariantTitle from './variant-title'

const CartLineItemLeftInStock = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemLeftInStock-public' */ './left-in-stock')
)

import { calcLineItemTotal, isAvailable } from '../../../common/products'
import { containerFluidCSS, flexRowCSS, flexColSmallCSS } from '../../../common/css'
import { getCurrencyCodeFromPayload } from '../../../common/pricing/data'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import find from 'lodash/find'

function CartLineItem({ lineItem, inventory }) {
  const { useContext, useState, useRef, useEffect } = wp.element
  const [cartState, cartDispatch] = useContext(CartContext)
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
        checkoutId: cartState.checkoutId,
      },
    })

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: 0,
        },
        checkoutId: cartState.checkoutId,
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
      <CartLineItemImage lineItem={lineItem} cartState={cartState} />

      <div className='wps-cart-lineitem-content'>
        <div
          className='wps-cart-lineitem-title col-12 p-0'
          data-wps-is-empty={hasRealVariant() ? 'false' : 'true'}>
          <div className='p-0 wps-cart-lineitem-title-wrapper' css={containerFluidCSS}>
            <div css={flexRowCSS}>
              <CartLineItemTitle lineItem={lineItem} />
              <CartLineItemRemove onRemove={onRemove} />
            </div>
          </div>
        </div>

        {hasRealVariant() && <CartLineItemVariantTitle lineItem={lineItem} />}

        {!isAvailable(lineItem) ? (
          <CartLineItemOutOfStock />
        ) : (
          <div className='p-0 wps-cart-lineitem-quantity-wrapper' css={containerFluidCSS}>
            <div css={[flexRowCSS, flexColSmallCSS]}>
              <CartLineItemQuantity
                lineItem={lineItem}
                variantId={variantId}
                lineItemQuantity={lineItemQuantity}
                setLineItemQuantity={setLineItemQuantity}
                isFirstRender={isFirstRender}
                setLineItemTotal={setLineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
              />

              <CartLineItemPrice
                lineItem={lineItem}
                lineItemTotal={lineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
                currencyCode={getCurrencyCodeFromPayload(cartState.checkoutCache)}
              />
            </div>

            {wpshopify.misc.isPro && (
              <CartLineItemLeftInStock lineItemId={lineItem.id} inventory={inventory} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { CartLineItem }

import { CartContext } from '../../cart/_state/context'
import { ShopContext } from '../../shop/_state/context'
import { Link } from '../../link'
import { CartLineItemQuantity } from './quantity'
import { formatPriceToCurrency } from '../../../common/pricing/formatting'
import { calcLineItemTotal, isAvailable } from '../../../common/products'
import { addCustomSizingToImageUrl } from '../../../common/images'
import { containerFluidCSS, flexRowCSS } from '../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import find from 'lodash/find'

const { useContext, useState, useRef, useEffect } = wp.element
const { Notice } = wp.components
const { __ } = wp.i18n

function getLineItemFromState(lineItem, lineItemsFromState) {
  return find(lineItemsFromState, { variantId: lineItem.id })
}

function CartLineItem({ lineItem, index }) {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [shopState] = useContext(ShopContext)

  const [isUpdating] = useState(false)
  const [lineItemQuantity, setLineItemQuantity] = useState(0)
  const [lineItemTotal, setLineItemTotal] = useState(0)

  const variantId = useRef(false)
  const lineItemElement = useRef()
  const isFirstRender = useRef(true)
  const lineItemTotalElement = useRef()

  function removeLineItem(e) {
    cartDispatch({
      type: 'REMOVE_LINE_ITEM',
      payload: {
        lineItem: variantId.current,
        checkoutId: shopState.checkoutId
      }
    })

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: 0
        },
        checkoutId: shopState.checkoutId
      }
    })
  }

  useEffect(() => {
    let lineItemFound = getLineItemFromState(lineItem, cartState.checkoutCache.lineItems)

    if (lineItemFound) {
      variantId.current = lineItemFound.variantId

      setLineItemQuantity(lineItemFound.quantity)
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFound.quantity))
    }
  }, [cartState.checkoutCache.lineItems])

  function placeholderImageUrl() {
    return wpshopify.misc.pluginsDirURL + 'public/imgs/placeholder.png'
  }

  function actualImageUrl() {
    return addCustomSizingToImageUrl({
      src: lineItem.image.src,
      width: 300,
      height: 300,
      crop: 'center'
    })
  }

  function lineItemImage() {
    return lineItem.image
      ? { backgroundImage: `url(${actualImageUrl()})` }
      : { backgroundImage: `url(${placeholderImageUrl()})` }
  }

  function hasRealVariant() {
    return lineItem.title !== 'Default Title'
  }

  const manualLink = wp.hooks.applyFilters('cart.lineItems.link', false, lineItem, cartState)

  const disableLink = wp.hooks.applyFilters(
    'cart.lineItems.disableLink',
    false,
    lineItem,
    cartState
  )

  const lineItemStyles = css`
    margin-top: 0;
    margin-bottom: 40px;
    overflow: hidden;
    min-height: 100px;
    position: relative;
    display: flex;
    top: -50px;
  `

  const priceCSS = css`
    flex: 1;
    text-align: right;
  `

  const badgeCSS = css`
    display: inline-block;
    width: auto;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 16px;
    color: white;
    background-color: #343a40;
    border-radius: 10rem;
    padding: 0.25em 0.6em;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    flex: 0 0 100%;
    max-width: 100%;
    letter-spacing: 0.02em;
    line-height: 1.4;
    margin: 5px 0 10px 0;
  `

  return (
    <div
      className='wps-cart-lineitem'
      data-wps-is-updating={isUpdating}
      data-wps-is-available={isAvailable(lineItem)}
      ref={lineItemElement}
      css={lineItemStyles}>
      <Link
        payload={lineItem}
        shop={shopState}
        type='products'
        classNames='wps-cart-lineitem-img-link'
        target='_blank'
        manualLink={manualLink}
        disableLink={disableLink}>
        <div
          className='wps-cart-lineitem-img'
          style={lineItemImage()}
          data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
        />
      </Link>

      <div className='wps-cart-lineitem-content'>
        <div
          className='wps-cart-lineitem-title col-12 p-0'
          data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
          data-wps-is-empty={hasRealVariant() ? 'false' : 'true'}>
          <div className='p-0' css={containerFluidCSS}>
            <div css={flexRowCSS}>
              <span className='wps-cart-lineitem-title-content col-9'>
                {wp.hooks.applyFilters(
                  'cart.lineItem.title',
                  __(lineItem.product.title, wpshopify.misc.textdomain)
                )}
              </span>
              <span className='wps-cart-lineitem-remove' onClick={removeLineItem}>
                {wp.hooks.applyFilters(
                  'cart.lineItem.remove.text',
                  __('Remove', wpshopify.misc.textdomain)
                )}
              </span>
            </div>
          </div>
        </div>

        {hasRealVariant() && (
          <div
            css={badgeCSS}
            className='wps-cart-lineitem-variant-title'
            data-wps-is-ready={shopState.isCartReady}>
            {wp.hooks.applyFilters(
              'cart.lineItem.variant.title',
              __(lineItem.title, wpshopify.misc.textdomain)
            )}
          </div>
        )}

        {!isAvailable(lineItem) ? (
          <Notice status='warning' isDismissible={false}>
            {wp.hooks.applyFilters(
              'notice.unavailable.text',
              __('Out of stock', wpshopify.misc.textdomain)
            )}
          </Notice>
        ) : (
          <div className='p-0' css={containerFluidCSS}>
            <div css={flexRowCSS}>
              <div className='col-8'>
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
              </div>

              <div className='wps-cart-lineitem-price-total-wrapper' css={priceCSS}>
                <div
                  className='wps-cart-lineitem-price wps-cart-lineitem-price-total'
                  data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
                  ref={lineItemTotalElement}>
                  {shopState.isCartReady &&
                    formatPriceToCurrency(lineItemTotal, shopState.info.currencyCode)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { CartLineItem }

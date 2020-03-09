import { ProductBuyButtonContext } from '../_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { Loader } from '../../../../loader'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductContext } from '../../_state/context'
import { useAnime, pulse } from '../../../../../common/animations'
import { checkoutRedirect } from '../../../../cart/checkout'

import {
  buildClient,
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

const { Notice } = wp.components
const { useContext, useRef, useEffect, useState } = wp.element
const { __ } = wp.i18n

function ProductAddButton() {
  const button = useRef()
  const isFirstRender = useRef(false)
  const animePulse = useAnime(pulse)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [hasNotice, setHasNotice] = useState(false)

  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [shopState] = useContext(ShopContext)

  const isDirectCheckout =
    itemsState.payloadSettings.directCheckout || shopState.settings.general.directCheckout

  const buttonStyle = {
    backgroundColor: itemsState.payloadSettings.addToCartButtonColor
  }

  function findVariantFromSelections() {
    return findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions)
  }

  function findSingleVariantFromPayload() {
    return buyButtonState.product.variants[0]
  }

  function buildAddToCartParams(lineItems, variants) {
    return {
      checkoutId: shopState.checkoutId,
      lineItems: lineItems,
      variants: variants
    }
  }

  function buildLineItemParams(variant, quantity) {
    return [
      {
        variantId: variant.id,
        quantity: quantity
      }
    ]
  }

  async function handleClick(e) {
    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!buyButtonState.allOptionsSelected && productState.hasManyVariants) {
      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
    } else {
      if (productState.hasManyVariants) {
        var variant = findVariantFromSelections()
      } else {
        var variant = findSingleVariantFromPayload()
      }

      if (!variant) {
        // TODO: Handle this better
        console.error('wpshopify error 💩 variant undefined ', variant)

        buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
        buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
        return
      }

      const lineItems = buildLineItemParams(variant, buyButtonState.quantity)

      if (isDirectCheckout) {
        setIsCheckingOut(true)

        const client = buildClient()
        const [err, checkout] = await to(createUniqueCheckout(client))

        if (err) {
          setIsCheckingOut(false)
          buyButtonDispatch({
            type: 'SET_ALL_SELECTED_OPTIONS',
            payload: false
          })
          buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

          return setHasNotice({
            message: err,
            type: 'error'
          })
        }

        const [error, respNewCheckout] = await to(addLineItemsAPI(client, checkout, lineItems))

        if (error) {
          setIsCheckingOut(false)
          buyButtonDispatch({
            type: 'SET_ALL_SELECTED_OPTIONS',
            payload: false
          })
          buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

          return setHasNotice({
            message: error,
            type: 'error'
          })
        }

        buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

        checkoutRedirect(respNewCheckout, shopState)
      } else {
        wp.hooks.doAction('product.addToCart', buildAddToCartParams(lineItems, [variant]))

        buyButtonDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false
        })

        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
        productDispatch({ type: 'SET_ADDED_VARIANT', payload: variant })
        productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false })
        buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

        wp.hooks.doAction('after.product.addToCart', lineItems, variant)
      }
    }
  }

  useEffect(() => {
    if (!shopState.isShopReady) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (buyButtonState.allOptionsSelected) {
      animePulse(button.current)
    }
  }, [buyButtonState.allOptionsSelected])

  function getButtonText() {
    if (isDirectCheckout) {
      return 'Checkout'
    }

    if (itemsState.payloadSettings.addToCartButtonText) {
      return itemsState.payloadSettings.addToCartButtonText
    }

    return 'Add to cart'
  }

  return (
    <div
      className='wps-component wps-component-products-add-button wps-btn-wrapper'
      data-wps-is-component-wrapper
      data-wps-product-id={buyButtonState.product.id}
      data-wps-post-id=''>
      <button
        ref={button}
        type='button'
        itemProp='potentialAction'
        itemScope
        itemType='https://schema.org/BuyAction'
        className='wps-btn wps-btn-secondary wps-add-to-cart'
        title={__(buyButtonState.product.title, wpshopify.misc.textdomain)}
        data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
        data-wps-is-direct-checkout={isDirectCheckout ? '1' : '0'}
        onClick={handleClick}
        style={buttonStyle}
        disabled={isCheckingOut}>
        {isCheckingOut ? (
          <Loader />
        ) : (
          wp.hooks.applyFilters(
            'product.addToCart.text',
            __(getButtonText(), wpshopify.misc.textdomain)
          )
        )}
      </button>

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false}>
          {wp.hooks.applyFilters(
            'notice.product.addToCart.text',
            __(hasNotice.message, wpshopify.misc.textdomain)
          )}
        </Notice>
      )}
    </div>
  )
}

export { ProductAddButton }

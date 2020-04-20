import { ProductBuyButtonContext } from '../_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { Loader } from '../../../../loader'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductContext } from '../../_state/context'
import { useAnime, pulse } from '../../../../../common/animations'
import { FilterHook } from '../../../../../common/utils'
import { hasLink } from '../../../../../common/settings'
import { Link } from '../../../../link'

import { checkoutRedirect } from '../../../../cart/checkout'

import {
  buildClient,
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

const { Notice } = wp.components
const { useContext, useRef, useEffect, useState } = wp.element
const { __ } = wp.i18n

function ProductAddButton() {
  const button = useRef()
  const isFirstRender = useRef(false)
  const animePulse = useAnime(pulse)
  const [isCheckingOut, setIsCheckingOut] = useState(() => false)
  const [hasNotice, setHasNotice] = useState(() => false)

  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [shopState] = useContext(ShopContext)

  const isDirectCheckout =
    itemsState.payloadSettings.directCheckout || shopState.settings.general.directCheckout

  const buttonStyle = {
    backgroundColor: itemsState.payloadSettings.addToCartButtonColor,
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
      variants: variants,
    }
  }

  function buildLineItemParams(variant, quantity) {
    return [
      {
        variantId: variant.id,
        quantity: quantity,
      },
    ]
  }

  async function handleClick(e) {
    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!buyButtonState.allOptionsSelected && productState.hasManyVariants) {
      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      return
    }

    if (productState.hasManyVariants) {
      var variant = findVariantFromSelections()
    } else {
      var variant = findSingleVariantFromPayload()
    }

    if (!variant) {
      // TODO: Handle this better
      console.error('WP Shopify error: handleClick variant undefined ')

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
          payload: false,
        })
        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

        return setHasNotice({
          message: err,
          type: 'error',
        })
      }

      const [error, respNewCheckout] = await to(addLineItemsAPI(client, checkout, lineItems))

      if (error) {
        setIsCheckingOut(false)
        buyButtonDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        })
        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

        return setHasNotice({
          message: error,
          type: 'error',
        })
      }

      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

      checkoutRedirect(respNewCheckout, shopState)
    } else {
      console.log('ADDING PRODUCTS ............................')

      wp.hooks.doAction('product.addToCart', buildAddToCartParams(lineItems, [variant]))

      buyButtonDispatch({
        type: 'SET_ALL_SELECTED_OPTIONS',
        payload: false,
      })

      buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
      productDispatch({ type: 'SET_ADDED_VARIANT', payload: variant })
      productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false })
      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

      wp.hooks.doAction('after.product.addToCart', lineItems, variant)
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

  function hasCustomButtonText() {
    if (!itemsState.payloadSettings.addToCartButtonText) {
      return false
    }
    if (
      itemsState.payloadSettings.addToCartButtonText != 'Checkout' ||
      itemsState.payloadSettings.addToCartButtonText != 'Add to cart' ||
      itemsState.payloadSettings.addToCartButtonText != 'View product'
    ) {
      return true
    }

    return false
  }

  function getButtonText() {
    if (hasCustomButtonText(itemsState)) {
      return itemsState.payloadSettings.addToCartButtonText
    }

    if (isDirectCheckout) {
      return 'Checkout'
    }

    if (hasLink(itemsState, shopState)) {
      return 'View product'
    }

    if (itemsState.payloadSettings.addToCartButtonText === 'View product') {
      return 'View product'
    }

    if (itemsState.payloadSettings.addToCartButtonText === 'Checkout') {
      return 'Checkout'
    }

    return 'Add to cart'
  }

  function AddButton({ hasLink }) {
    return (
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
        onClick={!hasLink && handleClick}
        style={buttonStyle}
        disabled={isCheckingOut}>
        {isCheckingOut ? (
          <Loader />
        ) : (
          <FilterHook name='product.addToCart.text'>
            {__(getButtonText(), wpshopify.misc.textdomain)}
          </FilterHook>
        )}
      </button>
    )
  }

  return (
    <div
      className='wps-component wps-component-products-add-button wps-btn-wrapper'
      data-wps-is-component-wrapper
      data-wps-product-id={buyButtonState.product.id}
      data-wps-post-id=''>
      {hasLink(itemsState, shopState) ? (
        <Link
          shop={shopState}
          type='products'
          payload={productState.payload}
          linkTo={itemsState.payloadSettings.linkTo}
          target={itemsState.payloadSettings.linkTarget}>
          <AddButton hasLink={true} />
        </Link>
      ) : (
        <AddButton />
      )}

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false}>
          <FilterHook name='notice.product.addToCart.text'>
            {__(hasNotice.message, wpshopify.misc.textdomain)}
          </FilterHook>
        </Notice>
      )}
    </div>
  )
}

export { ProductAddButton }

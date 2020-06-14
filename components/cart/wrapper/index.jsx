/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartContext } from '../_state/context'
import { addDiscountCode, removeDiscountCode } from '../_common'
import { useAction, useCartToggle } from '../../../common/hooks'
import { findTotalCartQuantities } from '../../../common/cart'

import { useAnime, slideOutCart, slideInCart } from '../../../common/animations'
import isEmpty from 'lodash/isEmpty'
import {
  getProductsFromLineItems,
  buildInstances,
  replaceLineItems,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { CartButtons } from '../buttons'
import to from 'await-to-js'

const CartHeader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartHeader-public' */ '../header')
)
const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents-public' */ '../contents')
)
const CartFooter = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartFooter-public' */ '../footer')
)

function CartWrapper() {
  const { useContext, useRef, useEffect, Suspense } = wp.element
  const { Spinner } = wp.components
  const cartElement = useRef()
  const [cartState, cartDispatch] = useContext(CartContext)
  const updateCheckoutAttributes = useAction('update.checkout.attributes')
  const setCheckoutAttributes = useAction('set.checkout.attributes')
  const setCheckoutNotes = useAction('set.checkout.note')
  const lineItemsAdded = useAction('product.addToCart')
  const discountCode = useAction('set.checkout.discount')
  const animeSlideInRight = useAnime(slideInCart)
  const animeSlideOutRight = useAnime(slideOutCart)
  const isCartOpen = useCartToggle(cartElement)

  useEffect(() => {
    cartBootstrap()
  }, [])

  function setEmptyCheckout() {
    cartDispatch({
      type: 'SET_CHECKOUT_ID',
      payload: false,
    })

    cartDispatch({ type: 'IS_CART_READY', payload: true })
  }

  async function cartBootstrap() {
    var [error, instances] = await to(buildInstances())

    if (error) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      })

      return setEmptyCheckout()
    }

    // If no checkout was found ...
    if (!instances || !instances.checkout) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: wp.i18n.__('No checkout instance available', 'wpshopify'),
        },
      })

      return setEmptyCheckout()
    }

    // If checkout was completed ...
    if (instances.checkout.completedAt) {
      var [buildInstancesError, newInstances] = await to(buildInstances(true))

      if (buildInstancesError) {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: buildInstancesError,
          },
        })

        return setEmptyCheckout()
      }

      if (!newInstances) {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: wp.i18n.__('No store checkout or client instances were found.', 'wpshopify'),
          },
        })

        return setEmptyCheckout()
      }

      // Responsible for creating the new checkout instance
      instances = newInstances
    }

    if (instances.checkout.discountApplications.length) {
      cartDispatch({
        type: 'SET_DISCOUNT_CODE',
        payload: instances.checkout.discountApplications[0].code,
      })
    }

    cartDispatch({
      type: 'SET_CHECKOUT_ID',
      payload: instances.checkout && instances.checkout.id ? instances.checkout.id : false,
    })

    let [productsError, products] = await to(getProductsFromLineItems())

    if (productsError) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: productsError,
        },
      })
    } else {
      cartDispatch({
        type: 'SET_CHECKOUT_CACHE',
        payload: { checkoutId: instances.checkout.id },
      })

      cartDispatch({
        type: 'SET_LINE_ITEMS_AND_VARIANTS',
        payload: {
          lineItems: { products: products },
          checkoutId: instances.checkout.id,
        },
      })

      if (isEmpty(products)) {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      } else {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      }
    }

    cartDispatch({ type: 'IS_CART_READY', payload: true })
  }

  function openCart() {
    animeSlideInRight(cartElement.current)
    cartDispatch({ type: 'CART_LOADED', payload: true })
    cartDispatch({ type: 'TOGGLE_CART', payload: true })
  }

  function closeCart() {
    animeSlideOutRight(cartElement.current)
    cartDispatch({ type: 'TOGGLE_CART', payload: false })
  }

  async function addDiscountCodeWrapper(discountCode) {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true })

    const [error, checkout] = await to(addDiscountCode(cartState, cartDispatch, discountCode))

    cartDispatch({ type: 'SET_IS_UPDATING', payload: false })

    if (error || !checkout) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      })

      return
    }

    cartDispatch({
      type: 'SET_CHECKOUT_CACHE',
      payload: { checkoutId: checkout.id },
    })

    //  cartDispatch({ type: 'UPDATE_CHECKOUT_TOTAL', payload: checkout.subtotalPriceV2.amount })
    cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: discountCode })
  }

  async function updateCheckoutWhenDiscount() {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true })

    const [updatedCheckoutError, updatedCheckout] = await to(
      replaceLineItems(cartState.checkoutCache.lineItems)
    )

    cartDispatch({ type: 'SET_CART_TOTAL', payload: updatedCheckout.subtotalPriceV2.amount })
    cartDispatch({
      type: 'SET_BEFORE_DISCOUNT_TOTAL',
      payload: updatedCheckout.lineItemsSubtotalPrice.amount,
    })

    if (
      cartState.totalLineItems === 0 ||
      !updatedCheckout.discountApplications.length ||
      !updatedCheckout.discountApplications[0].applicable
    ) {
      removeDiscountCode(cartDispatch)
      cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false })
    }

    cartDispatch({ type: 'SET_IS_UPDATING', payload: false })
  }

  useEffect(() => {
    if (discountCode) {
      addDiscountCodeWrapper(discountCode)
    }
  }, [discountCode])

  useEffect(() => {
    if (!cartState.isCartReady) {
      wp.hooks.doAction('before.cart.ready', cartState)
      return
    }

    wp.hooks.doAction('after.cart.ready', cartState)
  }, [cartState.isCartReady])

  useEffect(() => {
    cartDispatch({
      type: 'SET_TOTAL_LINE_ITEMS',
      payload: findTotalCartQuantities(cartState.checkoutCache.lineItems),
    })
  }, [cartState.checkoutCache.lineItems])

  useEffect(() => {
    wp.hooks.doAction('on.checkout.update', cartState)

    if (cartState.discountCode) {
      updateCheckoutWhenDiscount()
    }
  }, [cartState.totalLineItems])

  useEffect(() => {
    cartDispatch({
      type: 'UPDATE_CHECKOUT_ATTRIBUTES',
      payload: updateCheckoutAttributes,
    })
  }, [updateCheckoutAttributes])

  useEffect(() => {
    cartDispatch({
      type: 'SET_CHECKOUT_ATTRIBUTES',
      payload: setCheckoutAttributes,
    })
  }, [setCheckoutAttributes])

  useEffect(() => {
    wp.hooks.doAction('on.checkout.note', setCheckoutNotes)
    cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNotes })
  }, [setCheckoutNotes])

  useEffect(() => {
    if (isCartOpen) {
      openCart()
      return
    }
    closeCart()
  }, [isCartOpen])

  /*
  
  This hook is fired also from the <AddButton> component
  
  */
  useEffect(() => {
    if (!lineItemsAdded || isEmpty(lineItemsAdded)) {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      return
    }

    cartDispatch({
      type: 'UPDATE_LINE_ITEMS_AND_VARIANTS',
      payload: lineItemsAdded,
    })

    cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
  }, [lineItemsAdded])

  const cartCSS = css`
    width: 100%;
    padding: 1em;
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    margin-top: 0;
    max-width: 400px;
    background: white;
    box-shadow: -17px 0 35px rgba(0, 0, 0, 0.1);
    z-index: 99999999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 320ms ease;
    transform: translateX(110%);
    box-sizing: border-box;

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &.wps-cart-is-showing {
      transform: translateX(0%);
    }
  `

  const updatingOverlay = css`
    display: ${cartState.isUpdating ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    z-index: 2;

    .components-spinner {
      z-index: 9999;
      position: absolute;
      top: 40%;
      left: 50%;
      margin: 0;
      width: 26px;
      height: 26px;

      &:before {
        top: 4px;
        left: 4px;
        width: 7px;
        height: 7px;
        border-radius: 100%;
        transform-origin: 9px 9px;
      }
    }
  `

  return (
    <section ref={cartElement} className='wps-cart' css={cartCSS}>
      <div css={updatingOverlay}>
        <Spinner />
      </div>
      {<CartButtons buttons={cartState.buttons} />}

      <Suspense fallback={<Spinner />}>
        {cartState.isCartLoaded && (
          <>
            <CartHeader cartState={cartState} cartDispatch={cartDispatch} />
            <CartContents
              isCartEmpty={cartState.isCartEmpty}
              checkoutCache={cartState.checkoutCache}
            />
            <CartFooter />
          </>
        )}
      </Suspense>
    </section>
  )
}

export { CartWrapper }

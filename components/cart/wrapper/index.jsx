import { CartContext } from '../_state/context'
import { useAction, useCartToggle } from '../../../common/hooks'
import { findTotalCartQuantities } from '../../../common/cart'

import { useAnime, slideOutCart, slideInCart } from '../../../common/animations'
import isEmpty from 'lodash/isEmpty'
import {
  getProductsFromLineItems,
  buildInstances,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { CartButtons } from '../buttons'
import to from 'await-to-js'

const { useContext, useRef, useEffect } = wp.element
const { Spinner } = wp.components
const { Suspense } = wp.element

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
  const cartElement = useRef()
  const [cartState, cartDispatch] = useContext(CartContext)
  const updateCheckoutAttributes = useAction('update.checkout.attributes')
  const setCheckoutAttributes = useAction('set.checkout.attributes')
  const setCheckoutNotes = useAction('set.checkout.note')
  const lineItemsAdded = useAction('product.addToCart')
  const animeSlideInRight = useAnime(slideInCart)
  const animeSlideOutRight = useAnime(slideOutCart)
  const isCartOpen = useCartToggle(cartElement)

  useEffect(() => {
    cartBootstrap()
  }, [])

  async function cartBootstrap() {
    var [error, instances] = await to(buildInstances())
    console.log('cartBootstrap', instances)

    if (error) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      })

      return setShopAndCheckoutId()
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

      return setShopAndCheckoutId()
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

        return setShopAndCheckoutId()
      }

      if (!newInstances) {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: wp.i18n.__('No store checkout or client instances were found.', 'wpshopify'),
          },
        })

        return setShopAndCheckoutId()
      }

      // Responsible for creating the new checkout instance
      instances = newInstances
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
    wpshopify.misc.isPro && cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNotes })
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

  return (
    <section ref={cartElement} className='wps-cart'>
      <CartButtons buttons={cartState.buttons} />
      <Suspense fallback={<Spinner />}>
        {wpshopify.settings.general.cartLoaded && cartState.isCartLoaded && (
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

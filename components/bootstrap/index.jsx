import { ShopContext } from '../shop/_state/context'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { useIsMounted } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'
import to from 'await-to-js'

const { useEffect, useContext, useRef } = wp.element
const { __ } = wp.i18n

function ShopBootstrap({ children }) {
  const [shopState, shopDispatch] = useContext(ShopContext)
  const isMounted = useIsMounted()

  function setShopReady() {
    shopDispatch({ type: 'IS_SHOP_READY' })
  }

  function setShopAndCheckoutId(instances = false) {
    if (instances) {
      shopDispatch({
        type: 'SET_CHECKOUT_ID',
        payload: instances.checkout && instances.checkout.id,
      })
      shopDispatch({
        type: 'SET_SHOP_INFO',
        payload: instances.shop && instances.shop,
      })
    }

    // App is ready to go
    wp.hooks.doAction('after.app.ready', shopState)
  }

  async function bootstrapShop() {
    wp.hooks.doAction('before.app.ready', shopState)

    setShopReady()

    const [error, instances] = await to(buildInstances())

    console.log('AWAIT TO :::::::: error', error)
    console.log('AWAIT TO :::::::: instances', instances)

    if (!isMounted.current) {
      return
    }

    if (error) {
      shopDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __(error, wpshopify.misc.textdomain),
        },
      })

      return setShopAndCheckoutId()
    }

    // If no checkout was found ...
    if (!instances || !instances.checkout) {
      shopDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __('No checkout instance available', wpshopify.misc.textdomain),
        },
      })

      return setShopAndCheckoutId()
    }

    // If checkout was completed ...
    if (instances.checkout.completedAt) {
      var [buildInstancesError, newInstances] = await to(buildInstances(true))

      if (buildInstancesError) {
        shopDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: __(buildInstancesError, wpshopify.misc.textdomain),
          },
        })

        return setShopAndCheckoutId()
      }

      if (!newInstances) {
        shopDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: __(
              'No store checkout or client instances were found.',
              wpshopify.misc.textdomain
            ),
          },
        })

        return setShopAndCheckoutId()
      }

      // Responsible for creating the new checkout instance
      instances = newInstances
    }

    // Else just build like normal
    setShopAndCheckoutId(instances)
  }

  // ShopBootstrap app on mount only
  useEffect(() => {
    if (shopState.notices.length) {
      return
    }

    bootstrapShop()
  }, [])

  return <>{!shopState.notices.length && children}</>
}

export { ShopBootstrap }

import { ShopContext } from '../shop/_state/context'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

const { useEffect, useContext, useRef } = wp.element
const { __ } = wp.i18n

function ShopBootstrap({ children }) {
  const [shopState, shopDispatch] = useContext(ShopContext)
  const isMountedRef = useRef(false)

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
    wp.hooks.doAction('after.shop.ready', shopState)
  }

  async function bootstrapShop() {
    wp.hooks.doAction('before.app.ready', shopState)

    setShopReady()

    buildInstances().then(
      async (instances) => {
        if (isMountedRef.current) {
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
                  message: buildInstancesError,
                },
              })

              return setShopAndCheckoutId()
            }

            if (!newInstances) {
              shopDispatch({
                type: 'UPDATE_NOTICES',
                payload: {
                  type: 'error',
                  message: 'No store checkout or client instances were found.',
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
      },
      (error) => {
        if (isMountedRef.current) {
          shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: error,
            },
          })

          return setShopAndCheckoutId()
        }
      }
    )
  }

  // ShopBootstrap app on mount only
  useEffect(() => {
    isMountedRef.current = true

    //  console.log('<ShopBootstrap> :: useEffect[]', isMountedRef.current)

    if (isMountedRef.current) {
      bootstrapShop()
    }

    return () => (isMountedRef.current = false)
  }, [])

  return <>{children}</>
}

export { ShopBootstrap }

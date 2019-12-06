import React, { useEffect, useContext } from "react"
import { createHooks } from "@wordpress/hooks"
import { ShopContext } from "../shop/_state/context"
import { hasHooks } from "../../common/utils"
import { buildInstances } from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"
import to from "await-to-js"

function Bootstrap({ children }) {
  const [shopState, shopDispatch] = useContext(ShopContext)

  function setShopReady() {
    shopDispatch({ type: "IS_SHOP_READY" })
  }

  function setShopAndCheckoutId(instances = false) {
    if (instances) {
      shopDispatch({ type: "SET_CHECKOUT_ID", payload: instances.checkout.id })
      shopDispatch({ type: "SET_SHOP_INFO", payload: instances.shop })
    }
  }

  async function bootstrapShop() {
    // If running WP less < 5.0, polyfill the hooks
    if (hasHooks()) {
      wp.hooks.doAction("before.ready", shopState.settings)
    } else {
      if (typeof wp === "undefined") {
        window.wp = {}
        wp.hooks = createHooks()
      } else {
        wp.hooks = createHooks()
      }
    }

    setShopReady()

    buildInstances().then(
      async instances => {
        // If no checkout was found ...
        if (!instances || !instances.checkout) {
          shopDispatch({
            type: "UPDATE_NOTICES",
            payload: {
              type: "error",
              message: "No checkout instance available"
            }
          })

          return setShopAndCheckoutId()
        }

        // If checkout was completed ...
        if (instances.checkout.completedAt) {
          var [buildInstancesError, newInstances] = await to(
            buildInstances(true)
          )

          if (buildInstancesError) {
            shopDispatch({
              type: "UPDATE_NOTICES",
              payload: {
                type: "error",
                message: buildInstancesError
              }
            })

            return setShopAndCheckoutId()
          }

          if (!newInstances) {
            shopDispatch({
              type: "UPDATE_NOTICES",
              payload: {
                type: "error",
                message: "No store checkout or client instances were found."
              }
            })

            return setShopAndCheckoutId()
          }

          // Responsible for creating the new checkout instance
          instances = newInstances
        }

        // Else just build like normal
        setShopAndCheckoutId(instances)
      },
      error => {
        shopDispatch({
          type: "UPDATE_NOTICES",
          payload: {
            type: "error",
            message: error
          }
        })

        return setShopAndCheckoutId()
      }
    )
  }

  // Bootstrap app on mount only
  useEffect(() => {
    bootstrapShop()
  }, [])

  return <>{children}</>
}

export { Bootstrap }

import React, { useContext, useState, useEffect } from "react"
import { Button } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function UpdateCredentialsButton() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [hasCredentials, setHasCredentials] = useState(hasValidCreds())

  function hasCachedCredentials() {
    var existingCreds = localStorage.getItem("wps-storefront-creds")

    if (existingCreds) {
      return true
    }

    return false
  }

  function hasValidCreds() {
    if (hasCachedCredentials()) {
      return true
    }

    if (
      !builderState.settings.myShopifyDomain ||
      !builderState.settings.storefrontAccessToken
    ) {
      return false
    }

    return true
  }

  useEffect(() => {
    setHasCredentials(hasValidCreds())
  }, [builderState.hasCustomConnection])

  function onClick() {
    if (hasCredentials) {
      localStorage.removeItem("wps-storefront-creds")
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "myShopifyDomain", value: false }
      })
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "storefrontAccessToken", value: false }
      })
      builderDispatch({ type: "SET_CUSTOM_CONNECTION", payload: false })
      WP_Shopify.storefront = builderState.defaultCreds

      setHasCredentials(false)
    } else {
      var newCreds = {
        domain: builderState.settings.myShopifyDomain,
        storefrontAccessToken: builderState.settings.storefrontAccessToken
      }

      WP_Shopify.storefront = newCreds
      localStorage.setItem("wps-storefront-creds", JSON.stringify(newCreds))

      builderDispatch({ type: "SET_CUSTOM_CONNECTION", payload: true })
      setHasCredentials(true)
    }
  }

  return (
    <Button isDefault onClick={onClick} disabled={!hasValidCreds()}>
      {hasCredentials ? "Remove connected Shopify store" : "Load Shopify store"}
    </Button>
  )
}

export { UpdateCredentialsButton }

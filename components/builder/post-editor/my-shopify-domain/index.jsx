import React, { useContext, useState, useEffect, useRef } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { useDebounce } from "use-debounce"
import { sanitizeDomainField } from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"

function MyShopifyDomain() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [val, setVal] = useState(getCachedValue())
  const [debouncedValue] = useDebounce(val, 50)
  const isFirstRender = useRef(true)

  function getCachedValue() {
    var creds = JSON.parse(localStorage.getItem("wps-storefront-creds"))

    if (!creds) {
      return ""
    }

    return creds.domain
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    builderDispatch({
      type: "UPDATE_SETTING",
      payload: {
        key: "myShopifyDomain",
        value: sanitizeDomainField(debouncedValue)
      }
    })
  }, [debouncedValue])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!builderState.settings.myShopifyDomain) {
      setVal("")
    } else {
      setVal(builderState.settings.myShopifyDomain)
    }
  }, [builderState.hasCustomConnection])

  function onChange(newVal) {
    setVal(newVal)
  }

  return (
    <TextControl
      placeholder="store.myshopify.com"
      label="Shopify Domain"
      value={val}
      onChange={onChange}
      disabled={builderState.hasCustomConnection}
    />
  )
}

export { MyShopifyDomain }

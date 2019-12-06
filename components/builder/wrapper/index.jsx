import React, { useEffect, useContext, useRef } from "react"
import { BuilderContext } from "../_state/context"
import { ShopContext } from "../../shop/_state/context"

/** @jsx jsx */
import { jsx, css } from "@emotion/core"

import { BlockEditor } from "../block-editor"
import { PostEditor } from "../post-editor"
import { Shortcode } from "../shortcode"
import to from "await-to-js"
import { fetchNewItems } from "../_common"
import reduce from "lodash/reduce"
import isEqual from "lodash/isEqual"
import isArray from "lodash/isArray"
import isEmpty from "lodash/isEmpty"
import without from "lodash/without"
import pull from "lodash/pull"

function withoutBadValues(values) {
  return without(values, undefined, false, null)
}

function BuilderWrapper() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const isFirstRender = useRef(true)

  const mainEditorCSS = css`
    display: flex;
    justify-content: space-between;
  `

  async function fetchProducts() {
    builderDispatch({ type: "SET_IS_LOADING", payload: true })

    const [error, results] = await to(fetchNewItems("products", builderState))

    builderDispatch({ type: "SET_IS_LOADING", payload: false })
    builderDispatch({ type: "SET_IS_READY", payload: true })

    if (error) {
      builderDispatch({
        type: "UPDATE_NOTICES",
        payload: {
          type: "error",
          message: error
        }
      })
    } else {
      builderDispatch({ type: "SET_PAYLOAD", payload: results.model.products })
      builderDispatch({ type: "SET_NOTICES", payload: [] })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [
    builderState.settings.title,
    builderState.settings.tag,
    builderState.settings.vendor,
    builderState.settings.productType,
    builderState.settings.availableForSale,
    builderState.settings.connective,
    builderState.settings.reverse,
    builderState.settings.sortBy,
    builderState.settings.pageSize,
    builderState.settings.limit,
    builderState.hasCustomConnection
  ])

  function camelToSnake(string) {
    return string
      .replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "_" + m[1]
      })
      .toLowerCase()
  }

  function getTouchedSettings() {
    return reduce(
      builderState.defaultSettings,
      (result, value, key) => {
        return isEqual(value, builderState.settings[key])
          ? result
          : result.concat(key)
      },
      []
    )
  }

  function removeCredsFromTouched(touchedSettings) {
    return pull(touchedSettings, "myShopifyDomain", "storefrontAccessToken")
  }

  function buildFinalShortcodeString(validAttributes) {
    if (isEmpty(validAttributes)) {
      return "[wps_products]"
    }

    return "[wps_products " + validAttributes.join(" ") + "]"
  }

  function buildArrayOfAttributeStrings(touchedSettingsFinal) {
    return touchedSettingsFinal.map(key => {
      var val = builderState.settings[key]

      if (!isArray(val)) {
        if (
          val === undefined ||
          val === "undefinedpx" ||
          val === null ||
          val === ""
        ) {
          return
        }

        return camelToSnake(key) + '="' + val + '"'
      }

      var mappped = val.join(", ")
      var okString = camelToSnake(key) + '="' + mappped + '"'

      return okString
    })
  }

  useEffect(() => {
    var credsCachedMaybe = JSON.parse(
      localStorage.getItem("wps-storefront-creds")
    )

    if (credsCachedMaybe) {
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: {
          key: "storefrontAccessToken",
          value: credsCachedMaybe.storefrontAccessToken
        }
      })
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "myShopifyDomain", value: credsCachedMaybe.domain }
      })
      builderDispatch({ type: "SET_CUSTOM_CONNECTION", payload: true })
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    let touchedSettings = getTouchedSettings()

    let touchedSettingsFinal = removeCredsFromTouched(touchedSettings)

    if (isEmpty(touchedSettingsFinal)) {
      builderDispatch({
        type: "SET_SHORTCODE",
        payload: builderState.defaultShortcode
      })
      return
    }

    var asodkas = buildArrayOfAttributeStrings(touchedSettingsFinal)

    var validAttributes = withoutBadValues(asodkas)

    var finalShortcode = buildFinalShortcodeString(validAttributes)

    builderDispatch({ type: "SET_SHORTCODE", payload: finalShortcode })
  }, [builderState.productOptions, builderState.settings])

  return (
    <>
      <section css={mainEditorCSS}>
        <BlockEditor />
        <PostEditor />
      </section>

      <Shortcode />
    </>
  )
}
export { BuilderWrapper }

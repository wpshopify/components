import React, { useContext, useState, useRef, useEffect } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { convertValuesToString, removeEmptyValues } from "../../_common"
import { useDebounce } from "use-debounce"

function ProductType() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(savedVal())
  const [debouncedValue] = useDebounce(localVal, 400)
  const isFirstRender = useRef(true)

  function savedVal() {
    return convertValuesToString(builderState.settings.productType)
  }

  function onChange(newVal) {
    setLocalVal(newVal)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (localVal !== savedVal()) {
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "productType", value: removeEmptyValues(localVal) }
      })
    }
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(savedVal())
  }, [builderState.settings.productType])

  return (
    <TextControl
      label="Product Type"
      value={localVal}
      help="Match product types. Separate multiple by comma."
      onChange={onChange}
    />
  )
}

export { ProductType }

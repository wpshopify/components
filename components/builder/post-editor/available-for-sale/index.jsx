import React, { useContext, useState, useEffect } from "react"
import { CheckboxControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function AvailableForSale() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(
    builderState.settings.availableForSale
  )

  function onChange(newVal) {
    setLocalVal(newVal)
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "availableForSale", value: newVal }
    })
  }

  useEffect(() => {
    setLocalVal(builderState.settings.availableForSale)
  }, [builderState.settings.availableForSale])

  return (
    <CheckboxControl
      label="Available for sale"
      checked={localVal}
      onChange={onChange}
    />
  )
}

export { AvailableForSale }

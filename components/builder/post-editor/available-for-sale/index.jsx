import React, { useContext } from "react"
import { CheckboxControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function AvailableForSale() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "availableForSale", value: newVal }
    })
  }

  return (
    <CheckboxControl
      label="Available for sale"
      checked={builderState.settings.availableForSale}
      onChange={onChange}
    />
  )
}

export { AvailableForSale }

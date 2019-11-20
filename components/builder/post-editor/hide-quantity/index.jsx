import React, { useContext } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function HideQuantity() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "hideQuantity", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Hide quantity"
      checked={builderState.settings.hideQuantity}
      onChange={onChange}
    />
  )
}

export { HideQuantity }

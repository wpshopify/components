import React, { useContext } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function ShowQuantityLabel() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "showQuantityLabel", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show quantity label"
      checked={builderState.settings.showQuantityLabel}
      onChange={onChange}
    />
  )
}

export { ShowQuantityLabel }

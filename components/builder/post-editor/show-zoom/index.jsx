import React, { useContext, useState } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function ShowZoom() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "showZoom", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show zoom"
      checked={builderState.settings.showZoom}
      onChange={onChange}
    />
  )
}

export { ShowZoom }

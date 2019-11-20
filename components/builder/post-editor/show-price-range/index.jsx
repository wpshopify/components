import React, { useContext, useState } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function ShowPriceRange() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "showPriceRange", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show price range"
      checked={builderState.settings.showPriceRange}
      onChange={onChange}
    />
  )
}

export { ShowPriceRange }

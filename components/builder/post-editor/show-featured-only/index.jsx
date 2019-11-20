import React, { useContext, useState } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function ShowFeaturedOnly() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "showFeaturedOnly", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show featured only"
      checked={builderState.settings.showFeaturedOnly}
      onChange={onChange}
    />
  )
}

export { ShowFeaturedOnly }

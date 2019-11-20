import React, { useContext, useState } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function ShowCompareAt() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "showCompareAt", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show compare at"
      checked={builderState.settings.showCompareAt}
      onChange={onChange}
    />
  )
}

export { ShowCompareAt }

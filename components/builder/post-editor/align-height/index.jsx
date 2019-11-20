import React, { useContext } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function AlignHeight() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(isChecked) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "alignHeight", value: isChecked }
    })
  }

  return (
    <ToggleControl
      label="Align height?"
      checked={builderState.settings.alignHeight}
      onChange={onChange}
    />
  )
}

export { AlignHeight }

import React, { useContext } from "react"
import { CheckboxControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function Reverse() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "reverse", value: newVal }
    })
  }

  return (
    <CheckboxControl
      label="Reverse order?"
      checked={builderState.settings.reverse}
      onChange={onChange}
    />
  )
}

export { Reverse }

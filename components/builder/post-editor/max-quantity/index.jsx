import React, { useContext } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function MaxQuantity() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "maxQuantity", value: newVal }
    })
  }

  return (
    <TextControl
      type="Number"
      label="Max quantity"
      value={builderState.settings.maxQuantity}
      onChange={onChange}
    />
  )
}

export { MaxQuantity }

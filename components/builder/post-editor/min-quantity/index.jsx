import React, { useContext } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function MinQuantity() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "minQuantity", value: newVal }
    })
  }

  return (
    <TextControl
      type="Number"
      label="Min quantity"
      value={builderState.settings.minQuantity}
      onChange={onChange}
    />
  )
}

export { MinQuantity }

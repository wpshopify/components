import React, { useContext, useState } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function QuantityLabelText() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "quantityLabelText", value: newVal }
    })
  }

  return (
    builderState.settings.showQuantityLabel && (
      <TextControl
        label="Quantity label text"
        value={builderState.settings.quantityLabelText}
        onChange={onChange}
      />
    )
  )
}

export { QuantityLabelText }

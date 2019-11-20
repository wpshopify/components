import React, { useContext, useState } from "react"
import { BaseControl, ColorPalette } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { defaultColors } from "../../_common"

function AddToCartButtonColor() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newColor) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "addToCartButtonColor", value: newColor }
    })
  }

  return (
    <BaseControl label="Add to cart color:">
      <ColorPalette
        colors={defaultColors()}
        value={builderState.settings.addToCartButtonColor}
        onChange={onChange}
      />
    </BaseControl>
  )
}

export { AddToCartButtonColor }

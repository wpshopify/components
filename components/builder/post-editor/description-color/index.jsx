import React, { useContext, useState } from "react"
import { BaseControl, ColorPalette } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { defaultColors } from "../../_common"

function DescriptionColor() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newColor) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "descriptionColor", value: newColor }
    })
  }

  return (
    <BaseControl label="Description Color:">
      <ColorPalette
        colors={defaultColors()}
        value={builderState.settings.descriptionColor}
        onChange={onChange}
      />
    </BaseControl>
  )
}

export { DescriptionColor }

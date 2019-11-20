import React, { useContext } from "react"
import { BaseControl, ColorPalette } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { defaultColors } from "../../_common"

function VariantButtonColor() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newColor) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "variantButtonColor", value: newColor }
    })
  }

  return (
    <BaseControl label="Variant button color:" className="color-variants">
      <ColorPalette
        colors={defaultColors()}
        value={builderState.settings.variantButtonColor}
        onChange={onChange}
      />
    </BaseControl>
  )
}

export { VariantButtonColor }

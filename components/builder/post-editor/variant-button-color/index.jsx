import React, { useContext, useState } from 'react'
import { BaseControl, ColorPalette } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { defaultColors } from '../../_common'

function VariantButtonColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [color, setColor] = useState(builderState.settings.variantButtonColor)

   function onChange(newColor) {
      setColor(newColor)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'variantButtonColor', value: newColor } })
   }

   return (
      <BaseControl label='Variant button color:' className="color-variants">
         <ColorPalette colors={defaultColors()} value={color} onChange={onChange} />
      </BaseControl>
   )
}

export { VariantButtonColor }

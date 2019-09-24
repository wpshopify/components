import React, { useContext, useState } from 'react'
import { BaseControl, ColorPalette } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { defaultColors } from '../../_common'

function TitleColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [color, setColor] = useState(builderState.settings.titleColor)

   function onChange(newColor) {
      setColor(newColor)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'titleColor', value: newColor } })
   }

   return (
      <BaseControl label='Title Color:'>
         <ColorPalette colors={defaultColors()} value={color} onChange={onChange} />
      </BaseControl>
   )
}

export { TitleColor }

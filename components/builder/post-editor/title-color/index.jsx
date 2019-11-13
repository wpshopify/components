import React, { useContext, useState } from 'react'
import { BaseControl, ColorPalette } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { defaultColors } from '../../_common'

function TitleColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)

   function onChange(newColor) {
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'titleColor', value: newColor } })
   }

   return (
      <BaseControl label='Title Color:'>
         <ColorPalette colors={defaultColors()} value={builderState.settings.titleColor} onChange={onChange} />
      </BaseControl>
   )
}

export { TitleColor }

import React, { useContext, useState } from 'react'
import { BaseControl, ColorPalette } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { defaultColors } from '../../_common'

function AddToCartButtonColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [color, setColor] = useState(builderState.settings.addToCartButtonColor)

   function onChange(newColor) {
      setColor(newColor)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'addToCartButtonColor', value: newColor } })
   }

   return (
      <BaseControl label='Add to cart color:'>
         <ColorPalette colors={defaultColors()} value={color} onChange={onChange} />
      </BaseControl>
   )
}

export { AddToCartButtonColor }

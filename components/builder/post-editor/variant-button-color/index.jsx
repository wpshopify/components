import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function VariantButtonColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.variantButtonColor)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'variantButtonColor', value: newVal } })
   }

   return <TextControl label='Variant button color' value={val} onChange={onChange} />
}

export { VariantButtonColor }

import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function HideQuantity() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.hideQuantity)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'hideQuantity', value: newVal } })
   }

   return <ToggleControl label='Hide quantity' checked={val} onChange={onChange} />
}

export { HideQuantity }

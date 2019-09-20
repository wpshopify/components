import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function MaxQuantity() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.maxQuantity)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'maxQuantity', value: newVal } })
   }

   return <TextControl type='Number' label='Max quantity' value={val} onChange={onChange} />
}

export { MaxQuantity }

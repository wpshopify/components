import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function MinQuantity() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.minQuantity)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'minQuantity', value: newVal } })
   }

   return <TextControl type='Number' label='Min quantity' value={val} onChange={onChange} />
}

export { MinQuantity }

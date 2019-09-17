import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Vendor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.vendor)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'vendor', value: newVal } })
   }

   return <TextControl label='Vendor' value={val} help='Match product vendors' onChange={onChange} />
}

export { Vendor }

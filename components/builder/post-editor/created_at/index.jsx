import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function CreatedAt() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.created_at)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'created_at', value: newVal } })
   }

   return <TextControl label='Created At' value={val} help='Match product created at' onChange={onChange} />
}

export { CreatedAt }

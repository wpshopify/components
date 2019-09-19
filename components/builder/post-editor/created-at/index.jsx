import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function CreatedAt() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.createdAt)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'createdAt', value: newVal } })
   }

   return <TextControl label='Created At' value={val} help='Match product created at' onChange={onChange} />
}

export { CreatedAt }

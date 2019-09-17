import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Title() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.title)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'title', value: newVal } })
   }

   return <TextControl label='Title' value={val} help='Match product titles' onChange={onChange} />
}

export { Title }

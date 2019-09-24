import React, { useContext, useState } from 'react'
import { RadioControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Connective() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.connective)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'SET_IS_LOADING', payload: true })
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'connective', value: newVal } })
   }

   return (
      <RadioControl
         label='Connective'
         help='Determines whether to search for any match, or a group match. Default is AND'
         selected={val}
         options={[{ label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }]}
         onChange={onChange}
      />
   )
}

export { Connective }

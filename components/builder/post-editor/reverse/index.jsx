import React, { useContext, useState } from 'react'
import { CheckboxControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Reverse() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.reverse)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'reverse', value: newVal } })
   }

   return <CheckboxControl label='Reverse order?' checked={val} onChange={onChange} />
}

export { Reverse }

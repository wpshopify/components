import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function ShowQuantityLabel() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.showQuantityLabel)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'showQuantityLabel', value: newVal } })
   }

   return <ToggleControl label='Show quantity label' checked={val} onChange={onChange} />
}

export { ShowQuantityLabel }

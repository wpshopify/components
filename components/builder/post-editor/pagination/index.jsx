import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Pagination() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.pagination)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'pagination', value: newVal } })
   }

   return <ToggleControl label='Show pagination' checked={val} onChange={onChange} />
}

export { Pagination }

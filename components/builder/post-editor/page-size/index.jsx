import React, { useContext, useState } from 'react'
import { RangeControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function PageSize() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.pageSize)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'pageSize', value: newVal } })
   }

   return <RangeControl disabled={!builderState.settings.pagination} label='Page size' value={val} onChange={onChange} min={1} max={250} />
}
export { PageSize }

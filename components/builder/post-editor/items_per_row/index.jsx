import React, { useContext, useState } from 'react'
import { RangeControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function ItemsPerRow() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.items_per_row)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'items_per_row', value: newVal } })
   }

   return <RangeControl label='Items per row' value={val} onChange={onChange} min={1} max={20} />
}

export { ItemsPerRow }

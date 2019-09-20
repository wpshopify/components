import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function ShowPriceRange() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.showPriceRange)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'showPriceRange', value: newVal } })
   }

   return <ToggleControl label='Show price range' checked={val} onChange={onChange} />
}

export { ShowPriceRange }

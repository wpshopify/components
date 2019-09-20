import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function ShowFeaturedOnly() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.showFeaturedOnly)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'showFeaturedOnly', value: newVal } })
   }

   return <ToggleControl label='Show featured only' checked={val} onChange={onChange} />
}

export { ShowFeaturedOnly }

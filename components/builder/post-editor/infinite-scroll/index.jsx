import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function InfiniteScroll() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.infiniteScroll)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'infiniteScroll', value: newVal } })
   }

   return <ToggleControl label='Infinite scroll?' checked={val} onChange={onChange} />
}

export { InfiniteScroll }

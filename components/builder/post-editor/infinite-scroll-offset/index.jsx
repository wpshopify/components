import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function InfiniteScrollOffset() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.infiniteScrollOffset)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'infiniteScrollOffset', value: newVal } })
   }

   return builderState.settings.infiniteScroll && <TextControl label='Infinite Scroll Offset' value={val} onChange={onChange} type='number' help='Determines when infinite scroll begins' />
   
}

export { InfiniteScrollOffset }
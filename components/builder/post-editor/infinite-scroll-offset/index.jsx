import React, { useContext, useState, useEffect } from "react"
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function InfiniteScrollOffset() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [localVal, setLocalVal] = useState(builderState.settings.infiniteScrollOffset)

   function onChange(newVal) {
      setLocalVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'infiniteScrollOffset', value: newVal } })
   }

   useEffect(() => {
     setLocalVal(builderState.settings.infiniteScrollOffset)
   }, [builderState.settings.infiniteScrollOffset])

   return builderState.settings.infiniteScroll && <TextControl label='Infinite Scroll Offset' value={localVal} onChange={onChange} type='number' help='Determines when infinite scroll begins' />
   
}

export { InfiniteScrollOffset }
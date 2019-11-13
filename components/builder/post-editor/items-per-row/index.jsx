import React, { useContext, useState, useEffect, useRef } from 'react'
import { RangeControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { useDebounce } from 'use-debounce'

function ItemsPerRow() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.itemsPerRow)
   const [debouncedValue] = useDebounce(val, 50)
   const isFirstRender = useRef(true)

   function onChange(newVal) {
      setVal(newVal)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'itemsPerRow', value: debouncedValue } })
   }, [debouncedValue])

   return <RangeControl label='Items per row' value={val} onChange={onChange} min={1} max={20} />
}

export { ItemsPerRow }

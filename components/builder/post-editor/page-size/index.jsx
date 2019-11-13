import React, { useContext, useState, useRef, useEffect } from 'react'
import { RangeControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { useDebounce } from 'use-debounce'

function PageSize() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.pageSize)
   const [debouncedValue] = useDebounce(val, 150)
   const isFirstRender = useRef(true)

   function onChange(newVal) {
      setVal(newVal)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'pageSize', value: debouncedValue } })
   }, [debouncedValue])

   return <RangeControl disabled={!builderState.settings.pagination} label='Page size' value={val} onChange={onChange} min={1} max={250} />
}
export { PageSize }

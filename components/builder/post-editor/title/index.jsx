import React, { useContext, useState, useRef, useEffect } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { removeEmptyValues, buildQueryFromSelections } from '../../_common'
import { useDebounce } from 'use-debounce'

function Title() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.title)
   const [debouncedValue] = useDebounce(val, 250)
   const isFirstRender = useRef(true)

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'title', value: removeEmptyValues(val) } })
   }, [debouncedValue])

   function onChange(newVal) {
      setVal(newVal)
   }

   return <TextControl label='Title' value={val} help='Match product titles' onChange={onChange} />
}

export { Title }

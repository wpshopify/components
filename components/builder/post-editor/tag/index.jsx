import React, { useContext, useState, useRef, useEffect } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { removeEmptyValues } from '../../_common'
import { useDebounce } from 'use-debounce'

function Tag() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.tag)
   const [debouncedValue] = useDebounce(val, 250)
   const isFirstRender = useRef(true)

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'tag', value: removeEmptyValues(val) } })
   }, [debouncedValue])

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'SET_IS_LOADING', payload: true })
   }

   return <TextControl label='Tag' value={val} help='Match product tags' onChange={onChange} />
}

export { Tag }

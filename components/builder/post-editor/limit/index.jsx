import React, { useContext, useState } from 'react'
import { ToggleControl, TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Limit() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [limitToggle, setLimitToggle] = useState(false)
   const [val, setVal] = useState(builderState.settings.limit)

   function onChange() {
      setLimitToggle(!limitToggle)
   }

   function onLimitChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'limit', value: newVal } })
   }

   return (
      <>
         <ToggleControl label='Limit?' checked={limitToggle} onChange={onChange} />
         {limitToggle && <TextControl label='Limit' value={val} onChange={onLimitChange} type='number' help='Limits the overall output' />}
      </>
   )
}

export { Limit }

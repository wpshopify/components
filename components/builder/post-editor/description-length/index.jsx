import React, { useContext, useState } from 'react'
import { RangeControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function DescriptionLength() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.descriptionLength)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'descriptionLength', value: newVal } })
   }

   return <RangeControl label='Description Length' value={val} onChange={val => onChange(val)} min={1} max={200} />
}

export { DescriptionLength }

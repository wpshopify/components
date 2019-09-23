import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function AlignHeight() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.alignHeight)

   function onChange(isChecked) {
      setVal(isChecked)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'alignHeight', value: isChecked } })
   }

   return <ToggleControl label='Align height?' checked={val} onChange={isChecked => onChange(isChecked)} />
}

export { AlignHeight }

import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function DescriptionSize() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.descriptionSize)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'descriptionSize', value: newVal } })
   }

   return 'Font size'
}

export { DescriptionSize }

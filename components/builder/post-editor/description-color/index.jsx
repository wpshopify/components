import React, { useContext, useState } from 'react'
import { ToggleControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function DescriptionColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.descriptionColor)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'descriptionColor', value: newVal } })
   }

   return 'Color'
}

export { DescriptionColor }

import React, { useContext, useState } from 'react'
import { CheckboxControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function AvailableForSale() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.availableForSale)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'availableForSale', value: newVal } })
   }

   return <CheckboxControl label='Available for sale' checked={val} onChange={onChange} />
}

export { AvailableForSale }

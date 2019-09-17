import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function ProductType() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.product_type)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'product_type', value: newVal } })
   }

   return <TextControl label='Product Type' value={val} help='Match product product types' onChange={onChange} />
}
export { ProductType }

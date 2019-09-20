import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function AddToCartButtonText() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.addToCartButtonText)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'addToCartButtonText', value: newVal } })
   }

   return <TextControl label='Add to cart button text' value={val} onChange={onChange} />
}

export { AddToCartButtonText }

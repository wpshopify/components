import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function AddToCartButtonColor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.addToCartButtonColor)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'addToCartButtonColor', value: newVal } })
   }

   return <TextControl label='Add to cart button color' value={val} onChange={onChange} />
}

export { AddToCartButtonColor }

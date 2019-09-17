import React, { useContext, useState } from 'react'
import { CheckboxControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function Excludes() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.excludes)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'excludes', value: newVal } })
   }

   return (
      <>
         <CheckboxControl heading='Excludes' label='Title' checked={val.title} onChange={onChange} />
         <CheckboxControl label='Description' checked={val.description} onChange={onChange} />
         <CheckboxControl label='Images' checked={val.images} onChange={onChange} />
         <CheckboxControl label='Pricing' checked={val.pricing} onChange={onChange} />
         <CheckboxControl label='Buy Button' checked={val.buyButton} onChange={onChange} />
      </>
   )
}

export { Excludes }

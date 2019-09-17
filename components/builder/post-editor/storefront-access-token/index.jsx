import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function StorefrontAccessToken() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState('')

   function onChange(newVal) {
      setVal(newVal)
      // builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'title', value: newVal } })
   }

   return <TextControl label='Storefront Access Token' value={val} onChange={onChange} />
}

export { StorefrontAccessToken }

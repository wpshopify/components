import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function MyShopifyDomain() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState('')

   function onChange(newVal) {
      setVal(newVal)
      // builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'title', value: newVal } })
   }

   return <TextControl label='Shopify Domain' help='Example: store.myshopify.com' value={val} onChange={onChange} />
}

export { MyShopifyDomain }

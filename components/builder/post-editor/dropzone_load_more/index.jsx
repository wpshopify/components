import React, { useContext, useState } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function DropzoneLoadMore() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.dropzone_load_more)

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'dropzone_load_more', value: newVal } })
   }

   return <TextControl label='Load more dropzone' value={val} onChange={onChange} />
}

export { DropzoneLoadMore }

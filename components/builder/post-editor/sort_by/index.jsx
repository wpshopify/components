import React, { useContext, useState } from 'react'
import { SelectControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function SortBy() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(builderState.settings.sort_by)

   const options = [
      { label: 'Title', value: 'title' },
      { label: 'Vendor', value: 'vendor' },
      { label: 'ID', value: 'id' },
      { label: 'Price', value: 'price' },
      { label: 'Best selling', value: 'best_selling' },
      { label: 'Product type', value: 'product_type' },
      { label: 'Created at', value: 'created_at' },
      { label: 'Updated at', value: 'updated_at' }
   ]

   function onChange(newVal) {
      setVal(newVal)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'sort_by', value: newVal } })
   }

   return <SelectControl label='Sort by' value={val} options={options} onChange={onChange} />
}

export { SortBy }

import React, { useContext, useState } from 'react'
import { FontSizePicker, BaseControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { __ } from '@wordpress/i18n'

function DescriptionSize() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(16)

   const fontSizes = [
      {
         name: 'Small',
         slug: 'small',
         size: 18
      },
      {
         name: 'Medium',
         slug: 'medium',
         size: 22
      },
      {
         name: 'Big',
         slug: 'big',
         size: 28
      }
   ]

   return (
      <BaseControl>
         <FontSizePicker
            fontSizes={fontSizes}
            value={val}
            fallbackFontSize={18}
            withSlider={true}
            onChange={newFontSize => {
               setVal(newFontSize)
               builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'descriptionSize', value: newFontSize + 'px' } })
            }}
         />
      </BaseControl>
   )
}

export { DescriptionSize }

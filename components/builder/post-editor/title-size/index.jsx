import React, { useContext, useState, useEffect, useRef } from 'react'
import { FontSizePicker, BaseControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { __ } from '@wordpress/i18n'
import { useDebounce } from 'use-debounce'

function TitleSize() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(18)
   const [debouncedValue] = useDebounce(val, 10)
   const isFirstRender = useRef(true)

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

   function onChange(newFontSize) {
      setVal(newFontSize)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'titleSize', value: val + 'px' } })
   }, [debouncedValue])

   return (
      <BaseControl>
         <FontSizePicker fontSizes={fontSizes} value={val} fallbackFontSize={18} withSlider={true} onChange={onChange} />
      </BaseControl>
   )
}

export { TitleSize }

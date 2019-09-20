import React, { useContext, useState, useEffect } from 'react'
import { CheckboxControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import without from 'lodash/without'

function Excludes() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [excludesState, setExcludesState] = useState(builderState.settings.excludes)

   function inState(excludesState, type) {
      if (excludesState.includes(type)) {
         return true
      } else {
         return false
      }
   }

   function onChange(isChecked, type) {
      console.log('isChecked', isChecked)

      if (isChecked && inState(excludesState, type)) {
         return
      }

      if (isChecked) {
         setExcludesState(excludesState.concat([type]))
      } else {
         console.log('type', type)
         console.log('without excludesState', excludesState)

         var asfokasod = without(excludesState, type)

         console.log('v', asfokasod)

         setExcludesState(asfokasod)
      }
   }

   useEffect(() => {
      console.log('excludesState', excludesState)
      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'excludes', value: excludesState } })
   }, [excludesState])

   function Title() {
      return <CheckboxControl heading='Excludes' label='Title' checked={inState(excludesState, 'title')} onChange={isChecked => onChange(isChecked, 'title')} />
   }

   function Description() {
      return <CheckboxControl label='Description' checked={inState(excludesState, 'description')} onChange={isChecked => onChange(isChecked, 'description')} />
   }

   function Images() {
      return <CheckboxControl label='Images' checked={inState(excludesState, 'images')} onChange={isChecked => onChange(isChecked, 'images')} />
   }

   function Pricing() {
      return <CheckboxControl label='Pricing' checked={inState(excludesState, 'pricing')} onChange={isChecked => onChange(isChecked, 'pricing')} />
   }

   function BuyButton() {
      return <CheckboxControl label='Buy Button' checked={inState(excludesState, 'buy-button')} onChange={isChecked => onChange(isChecked, 'buy-button')} />
   }

   return (
      <>
         <Title />
         <Description />
         <Images />
         <Pricing />
         <BuyButton />
      </>
   )
}

export { Excludes }

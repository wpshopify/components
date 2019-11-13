import React, { useContext, useState, useEffect, useRef } from 'react'
import { TextControl } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'
import { useDebounce } from 'use-debounce'

function StorefrontAccessToken() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const [val, setVal] = useState(getCachedValue())
   const [debouncedValue] = useDebounce(val, 250)
   const isFirstRender = useRef(true)

   function getCachedValue() {
      var creds = JSON.parse(localStorage.getItem('wps-storefront-creds'))

      if (!creds) {
         return ''
      }

      return creds.storefrontAccessToken
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'storefrontAccessToken', value: debouncedValue } })
   }, [debouncedValue])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (!builderState.settings.storefrontAccessToken) {
         setVal('')
      } else {
         setVal(builderState.settings.storefrontAccessToken)
      }
   }, [builderState.hasCustomConnection])

   function onChange(newVal) {
      setVal(newVal)
   }

   return <TextControl placeholder='Enter your Storefront Access Token' label='Storefront Access Token' value={val} onChange={onChange} disabled={builderState.hasCustomConnection} />
}

export { StorefrontAccessToken }

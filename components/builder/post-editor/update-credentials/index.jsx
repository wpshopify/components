import React, { useContext, useState } from 'react'
import { Button } from '@wordpress/components'
import { BuilderContext } from '../../_state/context'

function UpdateCredentialsButton() {
   const [builderState, builderDispatch] = useContext(BuilderContext)

   function hasCustomConnection() {
      var existingCreds = sessionStorage.getItem('wps-storefront-creds')

      if (existingCreds) {
         return true
      }

      return false
   }

   function hasValidCreds() {
      if (hasCustomConnection()) {
         return true
      }

      if (!builderState.settings.myShopifyDomain || !builderState.settings.storefrontAccessToken) {
         return false
      }

      return true
   }

   function onClick() {
      
      if (hasValidCreds()) {

         console.log('builderState.hasCustomConnection', builderState.hasCustomConnection)
         
         if (builderState.hasCustomConnection) {
            console.log(1)
            sessionStorage.removeItem('wps-storefront-creds')
            builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'myShopifyDomain', value: false } })
            builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'storefrontAccessToken', value: false } })
            builderDispatch({ type: 'SET_CUSTOM_CONNECTION', payload: false })
            WP_Shopify.storefront = builderState.defaultCreds

         } else {
console.log(2)
            var newCreds = {
               domain: builderState.settings.myShopifyDomain,
               storefrontAccessToken: builderState.settings.storefrontAccessToken
            }

            WP_Shopify.storefront = newCreds
            sessionStorage.setItem('wps-storefront-creds', JSON.stringify(newCreds))

            builderDispatch({ type: 'SET_CUSTOM_CONNECTION', payload: true })

         }

         builderDispatch({ type: 'RESET_SETTINGS' })

      }
   }

   return (
      <Button isDefault onClick={onClick} disabled={!hasValidCreds()}>
         {builderState.hasCustomConnection ? 'Remove Shopify store' : 'Add Shopify store'}
      </Button>
   )
}

export { UpdateCredentialsButton }

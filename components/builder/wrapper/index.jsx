import React, { useEffect, useContext } from 'react'
import { BuilderContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { BlockEditor } from '../block-editor'
import { PostEditor } from '../post-editor'
import { Shortcode } from '../shortcode'
import to from 'await-to-js'
import { fetchNewItems } from '../_common'
import reduce from 'lodash/reduce'
import isEqual from 'lodash/isEqual'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import without from 'lodash/without'
import pull from 'lodash/pull'

function withoutBadValues(values) {
   return without(values, undefined, false, null);
}

function BuilderWrapper() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   // const [shopState, shopDispatch] = useContext(ShopContext)

   const mainEditorCSS = css`
      display: flex;
      justify-content: space-between;
   `

   async function fetchProducts() {
      console.log('fetchProducts', builderState)

      builderDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [error, results] = await to(fetchNewItems('products', builderState))

      
      builderDispatch({ type: 'SET_IS_LOADING', payload: false })
      builderDispatch({ type: 'SET_IS_READY', payload: true })

      if (error) {
         console.log('errorerrorerror', error)

         builderDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: error
            }
         })

      } else {
         console.log('results.model', results.model)
         builderDispatch({ type: 'SET_PAYLOAD', payload: results.model.products })   
      }
      
   }

   useEffect(() => {
      fetchProducts()
   }, [
      builderState.settings.title,
      builderState.settings.tag,
      builderState.settings.vendor,
      builderState.settings.productType,
      builderState.settings.availableForSale,
      builderState.settings.connective,
      builderState.settings.reverse,
      builderState.settings.sortBy,
      builderState.settings.pageSize,
      builderState.hasCustomConnection
   ])

   function camelToSnake(string) {
      return string
         .replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + '_' + m[1]
         })
         .toLowerCase()
   }

   function getTouchedSettings() {
      return reduce(builderState.defaultSettings, (result, value, key) => (isEqual(value, builderState.settings[key]) ? result : result.concat(key)), [])
   }

   function removeCredsFromTouched(touchedSettings) {
      return pull(touchedSettings, 'myShopifyDomain', 'storefrontAccessToken');
   }

   function buildFinalShortcodeString(validAttributes) {
      if (isEmpty(validAttributes)) {
         return '[wps_products]';
      }

      return '[wps_products ' + validAttributes.join(' ') + ']'

   }

   function buildArrayOfAttributeStrings(touchedSettingsFinal) {
      return touchedSettingsFinal.map(key => {

         var val = builderState.settings[key]

         console.log('val', val)

         if (!isArray(val)) {
            
            if (val === undefined || val === false || val === null || val === '') {
               return;
            }

            return camelToSnake(key) + '="' + val + '"'
         }

         var mappped = val.join(', ')
         var okString = camelToSnake(key) + '="' + mappped + '"'

         return okString
      });
   }

   useEffect(() => {
      var credsCachedMaybe = JSON.parse(sessionStorage.getItem('wps-storefront-creds'));

      if (credsCachedMaybe) {
         builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'storefrontAccessToken', value: credsCachedMaybe.storefrontAccessToken } })
         builderDispatch({ type: 'UPDATE_SETTING', payload: { key: 'myShopifyDomain', value: credsCachedMaybe.domain } })
         builderDispatch({ type: 'SET_CUSTOM_CONNECTION', payload: true })
      }
   }, [])

   useEffect(() => {

      let touchedSettings = getTouchedSettings()
      let touchedSettingsFinal = removeCredsFromTouched(touchedSettings)

      console.log('touchedSettingsFinal', touchedSettingsFinal)

      if (isEmpty(touchedSettingsFinal)) {
         builderDispatch({ type: 'SET_SHORTCODE', payload: builderState.defaultShortcode })
         return
      }

      var asodkas = buildArrayOfAttributeStrings(touchedSettingsFinal);
console.log('asodkas', asodkas)

      var validAttributes = withoutBadValues(asodkas);

      console.log('validAttributes', validAttributes)

      var finalShortcode = buildFinalShortcodeString(validAttributes);
      console.log('finalShortcode', finalShortcode)
      builderDispatch({ type: 'SET_SHORTCODE', payload: finalShortcode })

   }, [builderState.productOptions])

   return (
      <>
         <section css={mainEditorCSS}>
            <BlockEditor />
            <PostEditor />
         </section>

         <Shortcode />
      </>
   )
}
export { BuilderWrapper }

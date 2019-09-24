import React, { useEffect, useContext } from 'react'
import { BuilderContext } from '../_state/context'

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

function BuilderWrapper() {
   const [builderState, builderDispatch] = useContext(BuilderContext)

   const mainEditorCSS = css`
      display: flex;
      justify-content: space-between;
   `

   async function fetchProducts() {
      const [error, results] = await to(fetchNewItems('products', builderState))

      builderDispatch({ type: 'SET_IS_LOADING', payload: false })
      builderDispatch({ type: 'SET_IS_READY', payload: true })
      builderDispatch({ type: 'SET_PAYLOAD', payload: results.model.products })
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
      builderState.settings.pageSize
   ])

   function camelToSake(string) {
      return string
         .replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + '_' + m[1]
         })
         .toLowerCase()
   }

   useEffect(() => {
      var sdfsdf = reduce(builderState.defaultSettings, (result, value, key) => (isEqual(value, builderState.settings[key]) ? result : result.concat(key)), [])

      if (isEmpty(sdfsdf)) {
         builderDispatch({ type: 'SET_SHORTCODE', payload: builderState.defaultShortcode })
         return
      }

      var sfosak = sdfsdf.map(key => {
         var val = builderState.settings[key]

         if (!isArray(val)) {
            return camelToSake(key) + '="' + val + '"'
         }

         var mappped = val.join(', ')
         var okString = camelToSake(key) + '="' + mappped + '"'

         return okString
      })

      var weeee = '[wps_products ' + sfosak.join(' ') + ']'

      builderDispatch({ type: 'SET_SHORTCODE', payload: weeee })
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

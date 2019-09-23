import React, { useEffect, useContext } from 'react'
import { BuilderContext } from '../_state/context'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { BlockEditor } from '../block-editor'
import { PostEditor } from '../post-editor'
import { Shortcode } from '../shortcode'
import to from 'await-to-js'
import { fetchNewItems } from '../_common'

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
   }, [builderState.settings.title, builderState.settings.tag, builderState.settings.vendor, builderState.settings.productType])

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

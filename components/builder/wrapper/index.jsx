import React, { useEffect } from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { BlockEditor } from '../block-editor'
import { PostEditor } from '../post-editor'
import { Shortcode } from '../shortcode'
import to from 'await-to-js'
import { graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

function BuilderWrapper() {
   const mainEditorCSS = css`
      display: flex;
      justify-content: space-between;
   `

   async function fetchProducts() {
      const [error, results] = await to(
         graphQuery('products', {
            first: 9,
            query: '*',
            reverse: false,
            sortKey: 'TITLE'
         })
      )

      console.log('error', error)
      console.log('results', results)
   }

   useEffect(() => {
      fetchProducts()
   }, [])

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

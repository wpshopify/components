import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { BlockEditor } from '../block-editor'
import { PostEditor } from '../post-editor'
import { Shortcode } from '../shortcode'

function BuilderWrapper() {
   const mainEditorCSS = css`
      display: flex;
      justify-content: space-between;
   `

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

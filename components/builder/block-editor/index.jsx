import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkeletonLoader } from './loader'

function BlockEditor() {
   const editorCSS = css`
      flex: 1;
      max-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
   `

   const loaderCSS = css`
      max-width: 900px;
      width: 100%;
      position: relative;
      top: -100px;
      z-index: -1;
   `

   return (
      <section css={editorCSS} id='block-editor'>
         <div css={loaderCSS}>
            <SkeletonLoader />
         </div>
      </section>
   )
}

export { BlockEditor }

import React, { useContext, Suspense } from 'react'
import { Shop } from '../../shop'
import { Products } from '../../products'
import { Items } from '../../items'
import { BuilderContext } from '../_state/context'
import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkeletonLoader } from './loader'
import isEmpty from 'lodash/isEmpty'

function BlockEditor() {
   const [builderState, builderDispatch] = useContext(BuilderContext)

   const editorCSS = css`
      flex: 1;
      max-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 300px;
      padding-top: 200px;
      padding-bottom: 20em;
   `

   const loaderCSS = css`
      max-width: 900px;
      width: 100%;
      position: relative;
      top: -100px;
      z-index: 99;
   `

   return (
      <section css={editorCSS} id='block-editor'>
         <div css={loaderCSS} id='block-editor-inner' data-is-loading={builderState.isLoading}>
            {!isEmpty(builderState.notices) ? (
               builderState.notices.map(notice => <Notice message={notice.message} type={notice.type} key={uuidv4()} />)
            ) : !builderState.isShopReady ? (
               <SkeletonLoader />
            ) : (
               <Suspense fallback=''>
                  <Shop options={{ isCartReady: true }}>
                     <Items options={builderState.productOptions}>
                        <Products />
                     </Items>
                  </Shop>
               </Suspense>
            )}
         </div>
      </section>
   )
}

export { BlockEditor }
